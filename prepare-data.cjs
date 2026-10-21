const fs = require('fs');
const path = require('path');
const root='C:/Users/Zayar Myo Oo/Desktop/app/chord-scraper/data';
const songs=['studiomaj7','musiburma'].flatMap(site=>JSON.parse(fs.readFileSync(path.join(root,site+'.json'),'utf8')));
const index=[];
fs.mkdirSync('dist/songs',{recursive:true});
for(const [i,s] of songs.entries()) {
 const id=String(i+1); const text=s.chordpro||'';
 const artist=s.artist?.trim()||'အမည်မဖော်ပြထား';
 index.push({id,title:s.title,artist,key:s.key||'',source:s.source,hasChords:/\[[A-G](?:#|b)?[^\]\n]*\]/.test(text)});
 fs.writeFileSync('dist/songs/'+id+'.json',JSON.stringify({...s,id,artist,lyrics:s.lyrics||text.replace(/\[[^\]\n]*\]/g,'').replace(/^\{[^}]*\}\s*$/gm,'').trim()}));
}
fs.writeFileSync('dist/catalog.json',JSON.stringify(index));
console.log(JSON.stringify({songs:index.length,artists:new Set(index.map(s=>s.artist)).size,chordSheets:index.filter(s=>s.hasChords).length}));
