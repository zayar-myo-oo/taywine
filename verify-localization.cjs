const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
function load(preference){const ctx={window:{},localStorage:{getItem:()=>preference},document:{readyState:'loading',addEventListener(){}},Intl,Date};vm.createContext(ctx);vm.runInContext(fs.readFileSync('public/localization.js','utf8'),ctx);return ctx.window.TayWineI18n}
const api=load(null),t=api.translateText;
assert.equal(api.getLanguage(),'my');assert.equal(load('en').getLanguage(),'en');assert.equal(load('invalid').getLanguage(),'my');
assert.equal(t('သီချင်းအားလုံး','en'),'All songs');assert.equal(t('All songs','my'),'သီချင်းအားလုံး');assert.equal(t(' My songbook ','my'),' သီချင်းစာအုပ် ');
assert.equal(t('3,806 သီချင်း · 473 အဆိုတော်','en'),'3,806 songs · 473 artists');assert.equal(t('3,806 ပုဒ်အနက် 12 ပုဒ် ပြထားသည်','en'),'Showing 12 of 3,806 songs');
assert.equal(t('55% ဖတ်ပြီး · ဆက်ဖတ်မယ်','en'),'55% read · Continue');assert.equal(t('Playing · 1.5×','my'),'ဖွင့်နေသည် · 1.5×');
assert.equal(t('⚄ နောက်တစ်ပုဒ် ကံစမ်းမယ်','en'),'⚄ Shuffle a song');assert.equal(t('သီချင်းစာရင်းသို့ ↗','en'),'Back to songs ↗');
assert.equal(t('တိတ်တခိုးချစ် chords ဖွင့်မယ်','en'),'Open chords for တိတ်တခိုးချစ်');assert.equal(t('Fm guitar chord diagram','my'),'Fm ဂစ်တာလက်ကွက်');
for(const text of ['တိတ်တခိုးချစ်','အောင်နိုင်','C#m7/G#','1990','[C]မူရင်းသီချင်းစာသား'])assert.equal(t(text,'en'),text);
const source=fs.readFileSync('public/localization.js','utf8');assert.ok(source.includes('#sheet'));assert.ok(source.includes('.song-credit'));assert.ok(source.includes('data-no-i18n'));
const html=fs.readFileSync('public/index.html','utf8');assert.ok(html.indexOf('localization.js')<html.indexOf('app.js'));assert.ok(html.includes('localization.css'));
console.log('PASS: MY/EN copy, saved language preference, live counts, reader status, accessible labels, and preservation of song names and chord symbols.');
