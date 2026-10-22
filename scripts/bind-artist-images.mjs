// One-off maintenance script: finds photos for the most-credited artists and writes public/artist-images.json.
// Not part of the website. Run: node scripts/bind-artist-images.mjs [topN]
// Only exact name matches on Deezer whose top tracks look like Burmese songs are accepted; everything else is skipped, never guessed.
import {readFileSync,writeFileSync} from 'node:fs';
const catalog=JSON.parse(readFileSync('public/catalog.json','utf8'));
const out='public/artist-images.json';
const key=name=>String(name||'').normalize('NFC').toLocaleLowerCase().replace(/[​-‍﻿]/g,'').replace(/\s+/g,' ').trim();
const loose=name=>key(name).replace(/[^a-z0-9]/g,'');
// Romanized spellings to search for Myanmar-script credits; a missing entry means the name is skipped.
import {romanized as roman} from '../lib/cms/artist-romanized.mjs';
// Common syllables of romanized Burmese song titles, used to confirm the Deezer artist is the Myanmar artist.
const burmese=/\b(nga|ngar|myar|chit|thu|lay|yay|tal|nae|kyay|hmar|mhar|nhint|thaw|tae|par|pyar|sate|yin|lwan|kya|mya|aung|moe|nay|phyu|thar|lar|chin|mae|byar|ma|ka|ya|sa|da|wa|nyi|kyo|hla|myit|aye|myat|hmone|thwel|hlite|than|pann|phyat|zar|rate|htin|sone|lone|kyin|nyo|sein|tin|win|lwin|thet|oo|pyaw|shwe|kyun|yoe|min|nar|kaung|chaw|phoe|htet|zaw|yar|mhan|bayy)\b/i;
// Myanmar names with no public tracks to check; their photos were reviewed by eye before binding.
const reviewed=new Set(['eternalgosh','bophyu','chitkaung','hlwanmoe','glatt']);
const get=async url=>{for(let i=0;i<3;i++){const r=await fetch(url);if(r.ok){const d=await r.json();if(!d.error)return d}await new Promise(r=>setTimeout(r,1500))}return null};
// Deezer serves the same grey silhouette for artists without a photo.
const placeholder=async url=>{const r=await fetch(url);if(!r.ok)return true;const bytes=new Uint8Array(await r.arrayBuffer());const hash=Buffer.from(await crypto.subtle.digest('SHA-256',bytes)).toString('hex');return bytes.length<4000||hash.startsWith(SILHOUETTE)};
const SILHOUETTE=(await (async()=>{const r=await fetch('https://cdn-images.dzcdn.net/images/artist/ba68e22daf79d9b80b7fb01e80f78bd0/250x250-000000-80-0-0.jpg');return Buffer.from(await crypto.subtle.digest('SHA-256',new Uint8Array(await r.arrayBuffer()))).toString('hex')})());
async function find(names){for(const name of names){const search=await get('https://api.deezer.com/search/artist?limit=10&q='+encodeURIComponent(name));const exact=(search?.data||[]).filter(a=>loose(a.name)===loose(name)&&a.picture_medium&&!/\/artist\/\/|\/images\/artist\/\//.test(a.picture_medium)).sort((a,b)=>b.nb_fan-a.nb_fan);for(const a of exact){if(await placeholder(a.picture_medium))continue;const top=await get(`https://api.deezer.com/artist/${a.id}/top?limit=15`);const titles=(top?.data||[]).map(t=>t.title);const hits=titles.filter(t=>/[\u1000-\u109f]/.test(t)||burmese.test(t)).length;if(titles.length?hits/titles.length>=.4:reviewed.has(loose(a.name)))return {image:a.picture_medium,source:'deezer',deezer_id:a.id,matched:a.name,evidence:titles.slice(0,3)}}}return null}
const counts=new Map();for(const s of catalog){const k=key(s.artist);const item=counts.get(k)||{name:s.artist,songs:0};item.songs++;counts.set(k,item)}
const top=[...counts].sort((a,b)=>b[1].songs-a[1].songs).slice(0,Number(process.argv[2])||70);
const result={};let skipped=[];
for(const [k,{name,songs}] of top){const names=/[က-႟]/.test(name)?roman[k]:[name];if(!names){skipped.push(name);continue}const found=await find(names);if(found){result[k]={name,...found};console.log('✓',name,songs,'→',found.matched,found.evidence.join(' / '))}else{skipped.push(name);console.log('·',name,'not found')}}
writeFileSync(out,JSON.stringify(Object.fromEntries(Object.entries(result).map(([k,v])=>[k,{image:v.image,source:v.source,deezer_id:v.deezer_id}])),null,1)+'\n');
console.log(`\n${Object.keys(result).length} bound, ${skipped.length} skipped → ${out}`);
