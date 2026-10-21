/* Keep reader actions grouped and stable at every screen width. */
(() => {
 function polishToolbar(){const toolbar=$('.reader-tools');if(!toolbar||toolbar.querySelector('.reader-actions'))return;const row=document.createElement('div');row.className='reader-actions';for(const child of [...toolbar.children])if(!child.classList.contains('scroll-control'))row.append(child);toolbar.prepend(row);
  const print=$('#print-song'),share=$('#share-song');if(print){print.innerHTML=window.NyohIcon('print')+'<span class="action-label">Print</span>';print.setAttribute('aria-label','Print song');print.title='Print song'}if(share){share.innerHTML=window.NyohIcon('share')+'<span class="action-label">Copy link</span>';share.setAttribute('aria-label','Copy song link');share.title='Copy song link'}
 }
 const previousReady=window.Nyoh.songReady;window.Nyoh.songReady=s=>{previousReady(s);polishToolbar()};
})();
