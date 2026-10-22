const fs=require('fs');
const catalog=JSON.parse(fs.readFileSync('public/catalog.json','utf8'));
const selected=catalog.filter(s=>s.source==='musiburma').slice(0,18);
(async()=>{let count=0;for(const song of selected){try{
 const path=`public/songs/${song.id}.json`;const full=JSON.parse(fs.readFileSync(path,'utf8'));
 const res=await fetch(full.url,{signal:AbortSignal.timeout(20000)});if(!res.ok)continue;const html=await res.text();let flight='';
 for(const m of html.matchAll(/self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g)){flight+=JSON.parse('"'+m[1]+'"')}
 const youtube=flight.match(/"original_url":"(https?:[^" ]+)"/)?.[1]||flight.match(/"play_along_url":"(https?:[^" ]+)"/)?.[1];
 let image='';for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){try{const ld=JSON.parse(m[1]);if(typeof ld.image==='string'&&ld.image.startsWith('https://'))image=ld.image}catch{}}
 if(youtube&&/youtu(?:\.be|be\.com)/.test(youtube)){full.youtube_url=youtube;song.youtube_url=youtube}
 if(image){full.image_url=image;song.image_url=image}
 fs.writeFileSync(path,JSON.stringify(full));count++;console.log(`${song.id}: artwork=${!!image}, video=${!!song.youtube_url}`);
 }catch(e){console.log(`${song.id}: ${e.message}`)}}fs.writeFileSync('public/catalog.json',JSON.stringify(catalog));console.log(`Enriched ${count} song entries`);})();
