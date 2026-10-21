/* Inline SVGs stay crisp and visible without any icon font or emoji support. */
(() => {
 const paths={print:'<path d="M7 8V3h10v5M7 17H3V9h18v8h-4"/><path d="M7 14h10v7H7z"/><path d="M17 11h1"/>',share:'<path d="M14 3h7v7M21 3 11 13"/><path d="M10 5H4v16h16v-6"/>',
  discover:'<path d="m12 3 9 9-9 9-9-9 9-9Z"/><path d="m15 9-2 4-4 2 2-4 4-2Z"/>',
  music:'<path d="M9 18V5l11-2v13M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="17" cy="16" rx="3" ry="3"/>',
  artists:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5v1"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="7" cy="7" r="1"/><circle cx="17" cy="7" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/>',
  play:'<path d="m8 4 12 8-12 8V4Z"/>',pause:'<path d="M8 4v16M16 4v16"/>',
  search:'<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  sparkle:'<path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z"/>',
  external:'<path d="M7 17 19 5M7 5h12v12"/>',back:'<path d="m10 5-7 7 7 7M3 12h18"/>',down:'<path d="m6 9 6 6 6-6"/>',up:'<path d="m6 15 6-6 6 6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',
  theme:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18Z" fill="currentColor" stroke="none"/>',
  link:'<path d="m10 13 4-4M8 16l-1 1a4.2 4.2 0 0 1-6-6l5-5a4.2 4.2 0 0 1 6 0M16 8l1-1a4.2 4.2 0 0 1 6 6l-5 5a4.2 4.2 0 0 1-6 0"/>',
  edit:'<path d="m16 3 5 5-12 12-6 1 1-6L16 3Z"/><path d="m13 6 5 5"/>'
 };
 function icon(name){return `<svg class="ui-icon icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]||paths.music}</svg>`}
 window.NyohIcon=icon;
 const glyphs={'◈':'discover','♫':'music','♬':'music','♪':'music','♧':'artists','♡':'heart','♥':'heart','⚄':'dice','▶':'play','▷':'play','Ⅱ':'pause','⌕':'search','☀':'sun','✳':'sparkle','✦':'sparkle','✧':'sparkle','↗':'external','↙':'back','←':'back','↓':'down','＋':'plus','×':'close','◐':'theme'};
 const matches=/[◈♫♬♪♧♡♥⚄▶▷Ⅱ⌕☀✳✦✧↗↙←↓＋×◐]/g;
 function replaceText(node){const parent=node.parentElement;if(!parent||parent.closest('svg,script,style,#sheet,.song-title,.song-subtitle,.artist-cell,.pick-title,h1,h2,h3,#player-title,#player-artist,.player-footnote,.reader-source,.reader-artist,.speed-number-wrap,.scroll-range-labels,.scroll-reset,#toast'))return;const text=node.nodeValue;const standalone={'−':'minus','+':'plus','-':'minus'};let parts;
  if(standalone[text.trim()]&&parent.closest('button'))parts=[icon(standalone[text.trim()])];
  else {matches.lastIndex=0;if(!matches.test(text))return;matches.lastIndex=0;parts=[];let at=0;for(const match of text.matchAll(matches)){if(match.index>at)parts.push(document.createTextNode(text.slice(at,match.index)));parts.push(icon(glyphs[match[0]]));at=match.index+match[0].length}if(at<text.length)parts.push(document.createTextNode(text.slice(at)))}
  const fragment=document.createDocumentFragment();for(const part of parts){if(typeof part==='string'){const template=document.createElement('template');template.innerHTML=part;fragment.append(template.content)}else fragment.append(part)}node.replaceWith(fragment);
 }
 function hydrate(root){if(root.nodeType===3){replaceText(root);return}if(root.nodeType!==1||root.closest('svg,script,style,#sheet'))return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(replaceText)}
 hydrate(document.body);new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')replaceText(record.target);else record.addedNodes.forEach(hydrate)}}).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
