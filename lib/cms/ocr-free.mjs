import {REVIEW_MARK,normalizeOcr} from './ocr.mjs';
// Free chord-sheet OCR: Tesseract (run by the caller, in the browser) supplies word boxes; this module turns them into ChordPro.
export const SCALE=3;
// Darkest channel keeps black and coloured ink dark while washing out light/pastel backgrounds; then stretch contrast.
export function prepareGray(rgba,count){const g=new Uint8ClampedArray(count);let lo=255,hi=0;for(let i=0;i<count;i++){const v=Math.min(rgba[i*4+1],rgba[i*4+2],rgba[i*4]+60);g[i]=v;if(v<lo)lo=v;if(v>hi)hi=v}const span=Math.max(1,hi-lo);for(let i=0;i<count;i++)g[i]=(g[i]-lo)*255/span;return g}
const chordRe=/^[A-G](?:#|b)?(?:maj|min|dim|aug|sus|add|m)?\d{0,2}(?:sus\d)?(?:\/[A-G](?:#|b)?)?$/;
const chordGlobal=/[A-G](?:#|b)?(?:maj|min|dim|aug|sus|add|m)?\d{0,2}(?:sus\d)?(?:\/[A-G](?:#|b)?)?/g;
// Glyphs Tesseract commonly reads instead of a chord letter. Corrections are listed for review rather than trusted silently.
const confusions={'6':'G','၆':'G','0':'D','O':'D','Q':'D','င':'C','(င':'C','ဂ':'G'};
const punct=/^[()[\]{}|/\\.,;:~\-–_'"`“”‘’*+<>]+|[()[\]{}|/\\.,;:~\-–_'"`“”‘’*+<>]+$/g;
const myanmar=/[က-႟]/;
export function readChords(raw){const t=String(raw).replace(punct,'');if(!t)return null;if(chordRe.test(t))return {chords:[t]};
 const first=Object.keys(confusions).sort((a,b)=>b.length-a.length).find(k=>t.startsWith(k));if(first){const fixed=confusions[first]+t.slice(first.length).replace(/^O/,'');if(chordRe.test(fixed))return {chords:[fixed],fixed:true}}
 // Run-together chords, e.g. "GAm" or "/FG/".
 const parts=t.replace(/\//g,' ').split(/\s+/).flatMap(p=>p.match(chordGlobal)||[]);if(parts.length&&parts.join('')===t.replace(/\//g,''))return {chords:parts};return null}
const label=/^\(?(intro|in[a-z]{0,2}o|outro|ending|solo|interlude|bridge|pre(?:-?cho(?:rus)?)?|cho(?:rus)?|clo|cha|v\s*[1-9il]?|vi|va|verse\s*\d?)\.?\)?$/i;
export function readLabel(raw){const m=String(raw).trim().match(label);if(!m)return null;const k=m[1].toLowerCase().replace(/\s/g,'');
 if(/^in/.test(k))return 'Intro';if(k==='outro'||k==='ending')return 'Outro';if(k==='solo'||k==='interlude')return 'Solo';if(k==='bridge')return 'Bridge';if(k.startsWith('pre'))return 'Pre-Chorus';if(/^(cho|clo|cha)/.test(k))return 'Chorus';
 const n=k.match(/\d/)?.[0]||(/^v(i|l)$/.test(k)?'1':k==='va'?'1':'');return 'Verse'+(n?' '+n:'')}
const junk=/guitar|songs|lyrics|chords|facebook|youtube|tiktok|admin|www\.|\.com/gi;
// Myanmar dependent signs must stay attached to the letter before them, so a chord is never inserted in front of one.
const mark=/[ါ-ှၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏႚ-ႝ]/;
function snap(text,i){while(i>0&&i<text.length&&(mark.test(text[i])||text[i-1]==='္'))i--;return i}
function rows(words){const sorted=[...words].sort((a,b)=>(a.y0+a.y1)-(b.y0+b.y1));const h=median(words.map(w=>w.y1-w.y0))||10;const out=[];for(const w of sorted){const c=(w.y0+w.y1)/2;const row=out.find(r=>Math.abs(r.c-c)<h*.55);if(row){row.words.push(w);row.c=(row.c*(row.words.length-1)+c)/row.words.length}else out.push({c,words:[w]})}for(const r of out){r.words.sort((a,b)=>a.x0-b.x0);r.y0=Math.min(...r.words.map(w=>w.y0));r.y1=Math.max(...r.words.map(w=>w.y1))}return out.sort((a,b)=>a.c-b.c)}
// Vertical watermark text down a margin shows up as one short word per row in the same column; drop it.
function dropSideText(words){const h=median(words.map(w=>w.y1-w.y0))||10;const side=w=>w.x1-w.x0<h*2.5&&!readLabel(w.text);const small=words.filter(side);const col=new Map();for(const w of small){const k=Math.round(w.x0/(h*.6));col.set(k,(col.get(k)||0)+1)}const bad=new Set([...col].filter(([k,n])=>n>=5&&!words.some(w=>w.x1-w.x0>=h*2.5&&Math.round(w.x0/(h*.6))===k)).map(([k])=>k));return words.filter(w=>!(side(w)&&bad.has(Math.round(w.x0/(h*.6)))))}
function median(list){const s=[...list].sort((a,b)=>a-b);return s[s.length>>1]||0}
/** words: [{text,x0,y0,x1,y1,conf}] from the Myanmar+English pass; chordWords: same shape from a sparse English-only pass (optional). */
export function sheetFromWords(words,chordWords=[]){
 const overlap=(a,b)=>a.x0<b.x1&&b.x0<a.x1&&a.y0<b.y1&&b.y0<a.y1;
 const english=chordWords.filter(c=>readChords(c.text)||readLabel(c.text));
 // Where the English-only pass read a chord or section label, prefer it over the mixed pass's reading of the same spot.
 const better=w=>{const e=english.find(c=>overlap(w,c));return e&&!(myanmar.test(w.text)&&w.text.length>2)&&!readChords(w.text)&&!readLabel(w.text)?{...w,text:e.text,conf:e.conf}:w};
 const all=dropSideText([...words.filter(w=>w.text.trim()&&w.text.replace(punct,'').trim()).map(better),...english.filter(c=>!words.some(w=>overlap(w,c)))]);
 const review=[],out=[],meta={title:'',artist:'',key:'',capo:''};const fixes=[];let pendingChords=null,started=false;const lineH=median(all.map(w=>w.y1-w.y0))||10;
 const emit=(line,note)=>{out.push(line);if(note)review.push({line:out.length,note})};
 const flush=()=>{if(pendingChords){emit(pendingChords.map(c=>`[${c.name}]`).join(' '));pendingChords=null}};
 for(const row of rows(all)){let ws=row.words;const textAll=ws.map(w=>w.text).join(' ');
  // Credit/watermark rows ("… Guitar Songs", "Lyrics & Chords").
  if((textAll.match(junk)||[]).length>=2)continue;
  if(textAll.replace(/[\s.]/g,'').length<2&&!readChords(textAll))continue;
  // Structure line such as "V1. V2. Cho. Ending....".
  if(ws.length>2&&ws.filter(w=>readLabel(w.text.replace(/\.+$/,''))).length>=ws.length-1){flush();emit(`{comment: ${textAll.trim()}}`);continue}
  if(!started){const kv=textAll.match(/တေးဆို\s*[-–:.]?\s*(.+)/);if(kv){meta.artist=kv[1].trim();continue}const key=textAll.match(/\bkey\s*[-:=]?\s*([A-G][#b]?m?)/i);if(key){meta.key=key[1];continue}const capo=textAll.match(/\bcapo\s*[-:=]?\s*(\d{1,2})/i);if(capo){meta.capo=capo[1];continue}
   if(!meta.title&&myanmar.test(textAll)&&!readLabel(ws[0].text)&&ws.reduce((a,w)=>a+w.conf,0)/ws.length>=55){meta.title=textAll.replace(/\s+/g,' ').trim();continue}}
  // Section label at the start of the row.
  const lab=readLabel(ws[0].text)||readLabel(ws.slice(0,2).map(w=>w.text).join(''));if(lab){const taken=readLabel(ws[0].text)?1:2;ws=ws.slice(taken);started=true;emit(`{${lab}}`);if(ws[0]&&/^[-–:]$/.test(ws[0].text))ws=ws.slice(1)}
  if(!ws.length)continue;
  const read=ws.map(w=>({w,c:readChords(w.text)}));const tokens=read.filter(r=>r.w.text.replace(punct,''));const isRepeat=(r,i)=>tokens.length>1&&i===tokens.length-1&&/^x?[2-4]$/i.test(r.w.text.replace(punct,''));const counted=tokens.filter((r,i)=>!isRepeat(r,i));const chordShare=counted.filter(r=>r.c).length/Math.max(1,counted.length);
  if(chordShare>=.5&&!tokens.some(r=>!r.c&&myanmar.test(r.w.text)&&r.w.text.length>2)){started=true;flush();const chords=[];for(const r of tokens){if(r.c){if(r.c.fixed)fixes.push(`"${r.w.text}"→${r.c.chords[0]}`);const step=(r.w.x1-r.w.x0)/r.c.chords.length;r.c.chords.forEach((name,i)=>chords.push({name,x:r.w.x0+step*i,low:r.w.conf<50||r.c.fixed}))}else if(isRepeat(r,tokens.indexOf(r)))chords.push({name:'',repeat:r.w.text.replace(punct,'')});else chords.push({name:REVIEW_MARK,x:r.w.x0,low:true})}
   const repeat=chords.find(c=>c.repeat);pendingChords=chords.filter(c=>!c.repeat);pendingChords.y1=row.y1;pendingChords.repeat=repeat?.repeat;
   // An Intro/Solo row has its chords on the same line as the label: emit them as a chord-only line.
   if(lab){const r=pendingChords.repeat;emit(pendingChords.map(c=>`[${c.name}]`).join(' ')+(r?` x${r}`:''));pendingChords=null}continue}
  // Lyric row.
  started=true;let line='';const starts=[];const lowWords=[];for(const w of ws){const t=w.text.trim();if(!t)continue;if(line)line+=' ';if(w.conf<45&&!readChords(t)){lowWords.push(t);line+=REVIEW_MARK}starts.push({x0:w.x0,x1:w.x1,i:line.length,len:t.length});line+=t}
  if(pendingChords&&row.y0-pendingChords.y1<lineH*2.2){const inserts=pendingChords.map(c=>{let pos=0;const hit=starts.find(s=>c.x<s.x1)||starts[starts.length-1];if(c.x<=hit.x0)pos=hit.i;else pos=hit.i+Math.round((c.x-hit.x0)/Math.max(1,hit.x1-hit.x0)*hit.len);pos=Math.min(line.length,snap(line,Math.min(pos,line.length)));return {pos,name:c.name}}).sort((a,b)=>b.pos-a.pos);for(const c of inserts)line=line.slice(0,c.pos)+`[${c.name}]`+line.slice(c.pos);pendingChords=null}else flush();
  emit(line,lowWords.length?`Unclear text: ${lowWords.join(', ')}`:'')}
 flush();
 if(fixes.length)review.push({line:0,note:'OCR letters read as chords — check: '+fixes.join(', ')});
 const result=normalizeOcr({...meta,chordpro:out.join('\n'),review});result.song.source='TayWine OCR (free)';return result}
