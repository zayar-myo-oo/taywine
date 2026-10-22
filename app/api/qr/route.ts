import QRCode from 'qrcode';
import {publicSong} from '../../../lib/cms/public-server';
import {json,error} from '../../../lib/cms/server';
export async function GET(request:Request){try{const id=new URL(request.url).searchParams.get('songId')||'';if(!await publicSong(id))return json({error:'Song not found.'},404);const svg=await QRCode.toString(new URL('/#song/'+id,request.url).href,{type:'svg',margin:2,errorCorrectionLevel:'M',color:{dark:'#244332',light:'#ffffff'}});return new Response(svg,{headers:{'Content-Type':'image/svg+xml','Cache-Control':'public,max-age=300','X-Content-Type-Options':'nosniff'}})}catch(e){return error(e)}}
