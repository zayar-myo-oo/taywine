import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {chordNames} from '../lib/cms/model.mjs';
const catalog=JSON.parse(readFileSync('public/catalog.json','utf8'));
const index=Object.fromEntries(catalog.map(song=>[song.id,chordNames(JSON.parse(readFileSync(`public/songs/${song.id}.json`,'utf8')).chordpro)]));
mkdirSync('data',{recursive:true});writeFileSync('data/song-chords.json',JSON.stringify(index)+'\n');
console.log(`Indexed chord symbols for ${catalog.length} original arrangements.`);
