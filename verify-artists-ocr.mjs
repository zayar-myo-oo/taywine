// Pure checks for artist aliases and OCR result handling. Run: node verify-artists-ocr.mjs
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {artistKey,splitCredits,enrichCatalog,creditStats,suggestions,validateMerge} from './lib/cms/artists.mjs';
import {similarArtists} from './lib/cms/artists.mjs';
import {sheetFromWords,readChords,readLabel} from './lib/cms/ocr-free.mjs';
import {normalizeOcr,hasReviewMarks,imageType,REVIEW_MARK} from './lib/cms/ocr.mjs';
import {validateSong} from './lib/cms/model.mjs';
const catalog=JSON.parse(readFileSync('public/catalog.json','utf8'));
const aliases=[{alias_key:'ထက်ယံ',alias:'ထက်ယံ',artist_id:'x1',name:'ထက်ယံ'},{alias_key:'htet yan',alias:'Htet Yan',artist_id:'x1',name:'ထက်ယံ'}];
assert.equal(artistKey('  Htet   Yan​ '),'htet yan');
assert.deepEqual(splitCredits('နွဲ့ယဉ်ဝင်း၊ သားသား၊ ထက်ယံ'),['နွဲ့ယဉ်ဝင်း','သားသား','ထက်ယံ']);
const enriched=enrichCatalog(catalog,aliases);
assert.equal(enriched.length,catalog.length,'no songs lost');
assert.deepEqual(enriched.map(s=>s.id),catalog.map(s=>s.id),'IDs and order unchanged');
const htet=enriched.filter(s=>s.artist_keys?.includes('a:x1'));
assert.equal(htet.length,catalog.filter(s=>splitCredits(s.artist).some(p=>['ထက်ယံ','htet yan'].includes(artistKey(p)))).length);
assert.ok(htet.length>=3,'Myanmar and English credits both resolve to one artist');
assert.ok(htet.every(s=>s.artist_search.includes('Htet Yan')&&s.artist_search.includes('ထက်ယံ')),'searchable by either name');
const multi=htet.find(s=>splitCredits(s.artist).length>1);assert.ok(multi.artist_keys.some(k=>k.startsWith('c:')),'multi-credit keeps its own credit group');
assert.equal(htet.find(s=>s.artist==='htet yan').artist_names[0],'ထက်ယံ','canonical display name');
assert.ok(enriched.filter(s=>!s.artist_keys).every((s,i)=>s===catalog[enriched.indexOf(s)]),'unmerged songs untouched');
const credits=creditStats(catalog);
assert.throws(()=>validateMerge({names:['htet yan'],name:'htet yan'},credits),/2–20/);
assert.throws(()=>validateMerge({names:['htet yan','ထက်ယံ'],name:'Someone'},credits),/main display name/);
assert.throws(()=>validateMerge({names:['htet yan','not a real artist xyz'],name:'htet yan'},credits),/not a credited/);
assert.deepEqual(validateMerge({names:['htet yan','ထက်ယံ'],name:'ထက်ယံ'},credits).names.length,2);
const sug=suggestions([{key:'htetyan',name:'HtetYan'},{key:'htet yan',name:'Htet Yan'},{key:'aung',name:'Aung'}],[]);
assert.deepEqual(sug,[['HtetYan','Htet Yan']],'spacing variants suggested, not merged');
assert.deepEqual(suggestions([{key:'htetyan',name:'HtetYan'},{key:'htet yan',name:'Htet Yan'}],[{alias_key:'htetyan',artist_id:'a'},{alias_key:'htet yan',artist_id:'a'}]),[],'already merged not suggested');
// OCR
const ocr=normalizeOcr({title:'ထာဝရ',artist:'',key:'G',capo:'2',chordpro:'{Verse 1}\n[G]ချစ်တယ် [Xq9]မင်း\n[C]'+REVIEW_MARK+' love',review:[{line:3,note:'smudged word'}]});
assert.equal(ocr.song.artist,REVIEW_MARK,'missing artist flagged, not invented');
assert.ok(ocr.review.some(r=>/Artist not found/.test(r.note)));
assert.ok(ocr.review.some(r=>r.line===2&&/Xq9/.test(r.note)),'invalid chord flagged with line');
assert.ok(ocr.song.chordpro.includes('[G]ချစ်တယ်'),'valid chord kept above its lyric');
assert.ok(hasReviewMarks(ocr.song));
const song=validateSong({...ocr.song,artist:'Someone',ocr_review:ocr.review},'cms-'+'0'.repeat(8)+'-0000-0000-0000-'+'0'.repeat(12));
assert.equal(song.capo,'2');assert.ok(song.ocr_review.length>0);
assert.ok(hasReviewMarks(song),'publish is blocked while markers remain');
assert.ok(!hasReviewMarks({...song,chordpro:'{Verse 1}\n[G]ချစ်တယ်'.normalize(),title:'ထာဝရ'}));
assert.equal(imageType(new Uint8Array([0xff,0xd8,0xff,0])),'image/jpeg');
assert.equal(imageType(new Uint8Array([0x89,0x50,0x4e,0x47])),'image/png');
assert.equal(imageType(new TextEncoder().encode('RIFF0000WEBPVP8 ')),'image/webp');
assert.equal(imageType(new TextEncoder().encode('GIF89a......')),null);
// Public reader keeps its existing controls.
const app=readFileSync('public/app.js','utf8');assert.ok(app.includes('matchesArtist(s,state.artist)')&&app.includes('artist_search'));
// Free OCR layout: chord row above a lyric row is merged by x position; labels, header and side watermark are handled.
const W=(text,x0,y0,x1,conf=90)=>({text,x0,y0,x1,y1:y0+10,conf});
const sheet=sheetFromWords([W('ချစ်သူ',100,0,160),W('တေးဆို',10,20,40),W('-',42,20,46),W('အောင်သူ',50,20,90),W('Intro',10,40,30),W('G',40,40,46),W('Am',50,40,60),W('2',64,40,68),W('G',60,60,66),W('6',120,60,126),W('V1.',10,72,25),W('မင်းကို',60,72,100),W('ချစ်တယ်',120,72,160),W('ဝဝ',40,90,80,20),
 ...[0,1,2,3,4,5].map(i=>W('ဂ',300,i*15,306))]);
assert.equal(sheet.song.title,'ချစ်သူ');assert.equal(sheet.song.artist,'အောင်သူ');
assert.equal(sheet.song.chordpro,'{Intro}\n[G] [Am] x2\n{Verse 1}\n[G]မင်းကို [G]ချစ်တယ်\n'+REVIEW_MARK+'ဝဝ');
assert.ok(sheet.review.some(r=>r.note.includes('"6"→G')));assert.ok(hasReviewMarks(sheet.song));
assert.deepEqual(readChords('GAm').chords,['G','Am']);assert.equal(readChords('(င').chords[0],'C');assert.equal(readChords('ချစ်'),null);
assert.equal(readLabel('Cho.'),'Chorus');assert.equal(readLabel('V2'),'Verse 2');assert.equal(readLabel('Pre'),'Pre-Chorus');assert.equal(readLabel('မင်း'),null);
// Same / similar artist hints, including known Myanmar↔English pairs.
const hint=similarArtists('Htoo eain thin',[{key:'htoo eain thin',name:'Htoo eain thin',songs:5},{key:'ထူးအိမ်သင်',name:'ထူးအိမ်သင်',songs:9},{key:'lay phyu',name:'Lay Phyu',songs:3}],[]);
assert.deepEqual(hint.map(h=>[h.name,h.kind]),[['Htoo eain thin','same'],['ထူးအိမ်သင်','similar']]);
console.log('artist alias + OCR checks passed');
