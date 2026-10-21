const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const catalog=JSON.parse(fs.readFileSync('dist/catalog.json','utf8'));
assert.equal(catalog.length,3806);
for(const s of catalog){const full=JSON.parse(fs.readFileSync(`dist/songs/${s.id}.json`,'utf8'));assert.ok(full.chordpro);assert.ok(full.lyrics);assert.equal(full.title,s.title)}
const elements=new Map();const element=s=>{if(!elements.has(s))elements.set(s,{value:s==='#sort'?'default':'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){},scrollIntoView(){}});return elements.get(s)};
const ctx={console,Set,Map,fetch:async url=>({ok:true,json:async()=>url==='catalog.json'?catalog:JSON.parse(fs.readFileSync('dist/'+url,'utf8'))}),localStorage:{getItem(){return null},setItem(){}},document:{querySelector:element,querySelectorAll:()=>[],addEventListener(){},body:{classList:{toggle(){},add(){},contains(){return false}}}},window:{scrollTo(){},addEventListener(){}},history:{pushState(){},replaceState(){}},location:{hash:'',pathname:'/'},cancelAnimationFrame(){},setTimeout(){},clearTimeout(){}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/app.js','utf8')+';globalThis.testApi={state,filtered,transposeChord,renderList,openSong,renderSheet,toggleFavorite};',ctx);
(async()=>{await new Promise(r=>setImmediate(r));const a=ctx.testApi;
assert.equal(a.transposeChord('C/G',2),'D/A');assert.equal(a.transposeChord('Bbm7/F',-2),'G#m7/D#');assert.equal(a.transposeChord('G',-7),'C');
a.state.query=catalog[0].title;assert.ok(a.filtered().some(s=>s.id===catalog[0].id));
a.state.query='';a.state.filter='lyrics';assert.equal(a.filtered().length,2);
a.state.filter='all';a.toggleFavorite('1');a.state.view='favorites';assert.equal(a.filtered().length,1);a.toggleFavorite('1');assert.equal(a.filtered().length,0);
await a.openSong('1');assert.ok(element('#sheet').innerHTML.includes('chord'));a.state.lyricsOnly=true;a.renderSheet();assert.ok(!element('#sheet').innerHTML.includes('class="chord"'));
console.log('PASS: 3,806 data files; title search; lyrics filter; favorites; chord/slash-bass transposition; song loading and lyrics-only rendering.');
})().catch(e=>{console.error(e);process.exit(1)});
