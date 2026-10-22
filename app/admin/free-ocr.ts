'use client';
import {prepareGray,sheetFromWords,SCALE} from '../../lib/cms/ocr-free.mjs';
// Free OCR that runs entirely in the admin's browser with Tesseract (Myanmar + English). No API key and no server cost.
let workers:Promise<[any,any]>|null=null;
let report:(p:number)=>void=()=>{};
function load(){if(!workers)workers=(async()=>{const {createWorker}=await import('tesseract.js');const logger=(m:any)=>{if(m.status==='recognizing text')report(m.progress)};
 const mixed=await createWorker(['mya','eng'],1,{logger});await mixed.setParameters({preserve_interword_spaces:'1',user_defined_dpi:'300'} as any);
 const english=await createWorker('eng',1,{logger});await english.setParameters({tessedit_pageseg_mode:'11',user_defined_dpi:'300'} as any);return [mixed,english] as [any,any]})().catch(e=>{workers=null;throw e});return workers}
const boxes=(data:any)=>(data.blocks||[]).flatMap((b:any)=>b.paragraphs.flatMap((p:any)=>p.lines.flatMap((l:any)=>l.words))).map((w:any)=>({text:w.text,x0:w.bbox.x0,y0:w.bbox.y0,x1:w.bbox.x1,y1:w.bbox.y1,conf:w.confidence}));
export async function freeOcr(file:File,progress:(label:string)=>void){
 progress('OCR ပြင်ဆင်နေသည် (ပထမဆုံးအကြိမ် ~10MB download)…');const [mixed,english]=await load();
 const bitmap=await createImageBitmap(file);const scale=Math.min(SCALE,4200/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);const ctx=canvas.getContext('2d')!;ctx.imageSmoothingQuality='high';ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
 const image=ctx.getImageData(0,0,canvas.width,canvas.height);const gray=prepareGray(image.data,canvas.width*canvas.height);for(let i=0;i<gray.length;i++){image.data[i*4]=image.data[i*4+1]=image.data[i*4+2]=gray[i];image.data[i*4+3]=255}ctx.putImageData(image,0,0);
 report=p=>progress(`မြန်မာ/English စာသားဖတ်နေသည်… ${Math.round(p*100)}%`);const a=await mixed.recognize(canvas,{},{blocks:true});
 report=p=>progress(`Chord ဖတ်နေသည်… ${Math.round(p*100)}%`);const b=await english.recognize(canvas,{},{blocks:true});
 return sheetFromWords(boxes(a.data),boxes(b.data))}
