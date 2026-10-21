const fs = require('fs');
const path = require('path');
const root='C:/Users/Zayar Myo Oo/Desktop/app/chord-scraper/data';
const songs=['studiomaj7','musiburma'].flatMap(site=>JSON.parse(fs.readFileSync(path.join(root,site+'.json'),'utf8')));
const index=[];
const previous=fs.existsSync('dist/catalog.json')?JSON.parse(fs.readFileSync('dist/catalog.json','utf8')):[];
const mediaById=new Map(previous.filter(s=>s.image_url||s.youtube_url).map(s=>[s.id,{image_url:s.image_url,youtube_url:s.youtube_url,source_views:s.source_views,source_added_at:s.source_added_at,media_checked_at:s.media_checked_at,chord_count:s.chord_count,beginner_friendly:s.beginner_friendly}]));
fs.mkdirSync('dist/songs',{recursive:true});
for(const [i,s] of songs.entries()) {
 const id=String(i+1); const text=s.chordpro||'';
 const artist=s.artist?.trim()||'အမည်မဖော်ပြထား';
 const media=mediaById.get(id)||{};
 index.push({id,title:s.title,artist,key:s.key||'',source:s.source,hasChords:/\[[A-G](?:#|b)?[^\]\n]*\]/.test(text),...media});
 fs.writeFileSync('dist/songs/'+id+'.json',JSON.stringify({...s,id,artist,...media,lyrics:s.lyrics||text.replace(/\[[^\]\n]*\]/g,'').replace(/^\{[^}]*\}\s*$/gm,'').trim()}));
}
fs.writeFileSync('dist/catalog.json',JSON.stringify(index));
console.log(JSON.stringify({songs:index.length,artists:new Set(index.map(s=>s.artist)).size,chordSheets:index.filter(s=>s.hasChords).length}));
