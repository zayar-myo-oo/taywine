const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const ctx={safeRead:()=>({}),window:{},document:{addEventListener(){}},URL,console};vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/media.js','utf8'),ctx);
const parse=ctx.window.Nyoh.youtubeVideo;
assert.equal(parse('https://youtu.be/9v-Gva69wFU?t=1m30s').start,90);
assert.equal(parse('https://www.youtube.com/watch?v=9v-Gva69wFU').id,'9v-Gva69wFU');
assert.equal(parse('https://www.youtube.com/shorts/9v-Gva69wFU').id,'9v-Gva69wFU');
assert.equal(parse('https://youtube-nocookie.com/embed/9v-Gva69wFU').id,'9v-Gva69wFU');
for(const url of ['javascript:alert(1)','https://youtube.com.evil.com/watch?v=9v-Gva69wFU','https://youtu.be/invalid','https://youtube.com/playlist?list=x','https://example.com/9v-Gva69wFU'])assert.equal(parse(url),null);
const catalog=JSON.parse(fs.readFileSync('dist/catalog.json','utf8'));const media=catalog.filter(s=>s.image_url);assert.ok(media.length>=18);assert.ok(catalog.filter(s=>parse(s.youtube_url)).length>=17);
for(const s of media){const full=JSON.parse(fs.readFileSync(`dist/songs/${s.id}.json`));assert.equal(s.image_url,full.image_url);assert.equal(s.youtube_url,full.youtube_url)}
console.log('PASS: video URL validation, timestamps, malicious-host rejection, artwork and video mappings.');
