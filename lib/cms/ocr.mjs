import {chordNames} from './model.mjs';
// Unreadable text is kept as an explicit marker; songs containing it cannot be published.
export const REVIEW_MARK='⟦?⟧';
export function hasReviewMarks(song){return [song.title,song.artist,song.key,song.capo,song.chordpro].some(v=>String(v||"").includes("⟦?"))}
export function imageType(b){if(b[0]===0xff&&b[1]===0xd8&&b[2]===0xff)return 'image/jpeg';if(b[0]===0x89&&b[1]===0x50&&b[2]===0x4e&&b[3]===0x47)return 'image/png';if(String.fromCharCode(...b.subarray(0,4))==='RIFF'&&String.fromCharCode(...b.subarray(8,12))==='WEBP')return 'image/webp';return null}
export const ocrSchema={type:'object',additionalProperties:false,required:['title','artist','key','capo','chordpro','review'],properties:{title:{type:'string'},artist:{type:'string'},key:{type:'string'},capo:{type:'string'},chordpro:{type:'string'},review:{type:'array',items:{type:'object',additionalProperties:false,required:['line','note'],properties:{line:{type:'integer'},note:{type:'string'}}}}}};
export const OCR_PROMPT=`Transcribe this guitar chord sheet image into ChordPro for a Myanmar songbook editor.
Rules:
- Copy Myanmar (Burmese Unicode, not Zawgyi) and English lyrics exactly as printed. Do not translate, correct spelling or complete missing words.
- Put each chord in square brackets immediately before the syllable or word it is printed above, e.g. "[C]ချစ်တယ် [G]မင်းကို". Keep chord spelling as printed (Am, F#m7, G/B). Chord-only lines (intro/bar lines) stay as chord-only lines.
- Write section headings on their own line in braces, e.g. {Intro}, {Verse 1}, {Chorus}.
- Do not write title, artist, key or capo inside chordpro; return them in their own fields. Use "" when a field is not printed.
- Never guess. Where text or a chord cannot be read with confidence, write ${REVIEW_MARK} in its place (for a chord: [${REVIEW_MARK}]) and add a review item with the 1-based chordpro line number and a short note describing what is unclear.
- Keep line breaks as in the image. Return only the JSON object.`;
const clean=(v,max)=>typeof v==='string'?v.normalize('NFC').trim().slice(0,max):'';
export function normalizeOcr(raw){const review=Array.isArray(raw?.review)?raw.review.slice(0,100).map(r=>({line:Number.isInteger(r?.line)?r.line:0,note:clean(r?.note,300)})).filter(r=>r.note):[];
 let chordpro=clean(raw?.chordpro,100000).replace(/\r\n?/g,'\n');
 // Bracketed text that is not a valid chord symbol is flagged instead of silently dropped.
 const lines=chordpro.split('\n').map((line,i)=>line.replace(/\[([^\]\n]+)\]/g,(whole,c)=>{if(c===REVIEW_MARK||chordNames(whole).length)return whole;review.push({line:i+1,note:`Unrecognised chord "${c}"`});return `[${REVIEW_MARK}${c}]`}));
 chordpro=lines.join('\n');const title=clean(raw?.title,250),artist=clean(raw?.artist,250);
 if(!title)review.unshift({line:0,note:'Title not found in image'});if(!artist)review.unshift({line:0,note:'Artist not found in image'});
 return {song:{title:title||REVIEW_MARK,artist:artist||REVIEW_MARK,key:clean(raw?.key,30),capo:clean(raw?.capo,10),chordpro:chordpro||'{Verse 1}\n'+REVIEW_MARK,source:'TayWine OCR'},review,uncertain:(chordpro.match(/⟦\?/g)||[]).length}}
