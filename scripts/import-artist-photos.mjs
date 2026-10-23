// One-off import of portraits selected in the browser; not loaded by the website.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {artistKey} from '../lib/cms/artists.mjs';
const selected=JSON.parse(readFileSync('scripts/artist-photo-sources.json','utf8').replace(/^\uFEFF/,''));
const images=JSON.parse(readFileSync('public/artist-images.json','utf8'));
mkdirSync('public/artist-photos',{recursive:true});
let imported=0;
for(const [names,file,id,customUrl,source] of selected){
 const url=customUrl||'http://www.myitzuri.com/profile/'+file;
 const destination='public/artist-photos/'+file;
 try{
  if(!existsSync(destination)){
   const response=await fetch(url,{signal:AbortSignal.timeout(20000)});
   if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw new Error('Image unavailable');
   const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<2000)throw new Error('Image too small');
   writeFileSync(destination,bytes);
  }
  for(const name of names.split('|')){const key=artistKey(name);if(images[key])continue;images[key]={image:'/artist-photos/'+file,source:source||`http://www.myitzuri.com/profile-view.php?artist_id=${id}`};imported++;}
  console.log('OK',names.split('|')[0]);
 }catch(error){console.log('FAILED',names,error.message);}
}
writeFileSync('public/artist-images.json',JSON.stringify(images,null,1)+'\n');
console.log(JSON.stringify({imported,totalBindings:Object.keys(images).length}));
