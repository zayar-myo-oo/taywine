const fs = require('fs');
const path = require('path');
const root=process.argv[2]||process.env.TAYWINE_SOURCE_DATA;if(!root)throw new Error('Pass the chord-scraper/data directory or set TAYWINE_SOURCE_DATA.');
const songs=['studiomaj7','musiburma'].flatMap(site=>JSON.parse(fs.readFileSync(path.join(root,site+'.json'),'utf8')));
const index=[];
const previous=fs.existsSync('public/catalog.json')?JSON.parse(fs.readFileSync('public/catalog.json','utf8')):[];
const mediaById=new Map(previous.map(s=>[s.id,{image_url:s.image_url,youtube_url:s.youtube_url,source_views:s.source_views,source_added_at:s.source_added_at,media_checked_at:s.media_checked_at,chord_count:s.chord_count,beginner_friendly:s.beginner_friendly}]));
// Artist pages on the source site: studiomaj7 entries carry them from the scraper; MusiBurma
// song URLs are /songs/<artist-slug>/<song>, which is the artist's page for single-artist songs.
function artistLinks(s){
 if(s.artist_links?.length)return s.artist_links;
 const slug=s.source==='musiburma'&&s.url?.match(/\/songs\/([^/]+)\//)?.[1];
 return slug&&s.artist&&!s.artist.includes(',')?[{name:s.artist.trim(),url:'https://www.musiburma.com/artists/'+slug}]:[];
}
fs.mkdirSync('public/songs',{recursive:true});
for(const [i,s] of songs.entries()) {
 const id=String(i+1); const text=s.chordpro||'';
 const artist=s.artist?.trim()||'အမည်မဖော်ပြထား';
 const media=mediaById.get(id)||{};
 const artist_links=artistLinks(s);
 index.push({id,title:s.title,artist,key:s.key||'',source:s.source,hasChords:/\[[A-G](?:#|b)?[^\]\n]*\]/.test(text),...media});
 fs.writeFileSync('public/songs/'+id+'.json',JSON.stringify({...s,id,artist,artist_links,...media,lyrics:s.lyrics||text.replace(/\[[^\]\n]*\]/g,'').replace(/^\{[^}]*\}\s*$/gm,'').trim()}));
}
fs.writeFileSync('public/catalog.json',JSON.stringify(index));
console.log(JSON.stringify({songs:index.length,artists:new Set(index.map(s=>s.artist)).size,chordSheets:index.filter(s=>s.hasChords).length}));
