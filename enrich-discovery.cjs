const fs=require('fs');
const catalog=JSON.parse(fs.readFileSync('public/catalog.json','utf8'));
const entries=catalog.filter(s=>s.source==='musiburma');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function enrich(song){const p=`public/songs/${song.id}.json`;const full=JSON.parse(fs.readFileSync(p,'utf8'));try{
 const response=await fetch(full.url,{signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('HTTP '+response.status);const html=await response.text();let flight='';
 for(const m of html.matchAll(/self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g))flight+=JSON.parse('"'+m[1]+'"');
 const titleAt=flight.indexOf('"title":'+JSON.stringify(full.title)+',"title_en":');if(titleAt<0)throw Error('Song metadata not found');const metadata=flight.slice(titleAt,titleAt+7000);
 const views=metadata.match(/"view_count":(\d+)/)?.[1];const added=metadata.match(/"published_at":"([^"]+)"/)?.[1]||metadata.match(/"created_at":"([^"]+)"/)?.[1];
 if(views!==undefined){song.source_views=Number(views);full.source_views=Number(views)}if(added){song.source_added_at=added;full.source_added_at=added}
 const youtube=metadata.match(/"original_url":"(https?:[^" ]+)"/)?.[1]||metadata.match(/"play_along_url":"(https?:[^" ]+)"/)?.[1];if(youtube&&/youtu(?:\.be|be\.com)/.test(youtube)){song.youtube_url=youtube;full.youtube_url=youtube}
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){try{const ld=JSON.parse(m[1]);if(typeof ld.image==='string'&&ld.image.startsWith('https://')){song.image_url=ld.image;full.image_url=ld.image}}catch{}}
 song.media_checked_at=new Date().toISOString();fs.writeFileSync(p,JSON.stringify(full));return true;
 }catch(e){console.log(`${song.id}: ${e.message}`);return false}}
(async()=>{let count=0;for(let i=0;i<entries.length;i+=3){const results=await Promise.all(entries.slice(i,i+3).map(enrich));count+=results.filter(Boolean).length;if(i%30===0){fs.writeFileSync('public/catalog.json',JSON.stringify(catalog));console.log(`${Math.min(i+3,entries.length)}/${entries.length} metadata checked`)}await sleep(450)}fs.writeFileSync('public/catalog.json',JSON.stringify(catalog));console.log(JSON.stringify({enriched:count,images:catalog.filter(s=>s.image_url).length,videos:catalog.filter(s=>s.youtube_url).length,ranked:catalog.filter(s=>s.source_views!==undefined).length}));})();
