import Anthropic from '@anthropic-ai/sdk';
import {env} from 'cloudflare:workers';
import {admin,json,error} from '../../../../lib/cms/server';
import {CmsError} from '../../../../lib/cms/model.mjs';
import {imageType,ocrSchema,OCR_PROMPT,normalizeOcr} from '../../../../lib/cms/ocr.mjs';
export const dynamic='force-dynamic';
const MAX_BYTES=5*1024*1024;
function base64(bytes:Uint8Array){let out='';for(let i=0;i<bytes.length;i+=0x8000)out+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(out)}
export async function POST(request:Request){try{await admin();
 const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin||request.headers.get('sec-fetch-site')==='cross-site')throw new CmsError('Same-origin request required.',403);
 if(!request.headers.get('content-type')?.startsWith('multipart/form-data'))throw new CmsError('Upload an image file.',415);
 if(Number(request.headers.get('content-length'))>MAX_BYTES+200000)throw new CmsError('Image must be 5 MB or smaller.',413);
 // The key lives only in Sites runtime secrets; it is never sent to the browser.
 if(!env.ANTHROPIC_API_KEY)return json({error:'OCR is not configured. Add the ANTHROPIC_API_KEY secret in Sites environment settings, then deploy again.',code:'ocr_not_configured',required:['ANTHROPIC_API_KEY']},503);
 const file=(await request.formData()).get('image');if(!file||typeof file==='string')throw new CmsError('Upload a JPG, PNG or WebP image.');
 const bytes=new Uint8Array(await file.arrayBuffer());if(bytes.length>MAX_BYTES)throw new CmsError('Image must be 5 MB or smaller.',413);const media=imageType(bytes);if(!media)throw new CmsError('Only JPG, PNG or WebP images are supported.',415);
 const client=new Anthropic({apiKey:env.ANTHROPIC_API_KEY});
 const params:any={model:env.OCR_MODEL||'claude-opus-5-5',max_tokens:16000,betas:['server-side-fallback-2026-07-01'],fallbacks:'default',output_config:{effort:'high',format:{type:'json_schema',schema:ocrSchema}},messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:media,data:base64(bytes)}},{type:'text',text:OCR_PROMPT}]}]};
 let response:any;try{response=await client.beta.messages.create(params)}catch(e){if(e instanceof Anthropic.AuthenticationError||e instanceof Anthropic.PermissionDeniedError)return json({error:'The OCR service rejected ANTHROPIC_API_KEY. Check the secret in Sites environment settings.',code:'ocr_auth'},502);if(e instanceof Anthropic.RateLimitError)return json({error:'OCR service is busy. Try again in a minute.'},429);if(e instanceof Anthropic.APIError){console.error('OCR request failed',e.status,e.message);return json({error:'OCR service failed. Try again.'},502)}throw e}
 if(response.stop_reason==='refusal')throw new CmsError('OCR could not read this image. Try a clearer photo.',422);if(response.stop_reason==='max_tokens')throw new CmsError('The chord sheet is too long for one image. Crop it into parts.',422);
 const text=response.content.find((b:any)=>b.type==='text')?.text;let raw;try{raw=JSON.parse(text||'')}catch{throw new CmsError('OCR returned an unreadable result. Try again.',502)}
 return json(normalizeOcr(raw))}catch(e){return error(e)}}
