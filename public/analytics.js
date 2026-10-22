/* First-party aggregate analytics: daily random browser IDs; no names, IPs or searches. */
(()=>{
 if(navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true)return;
 let currentDay='',visitor='',sentPage=false;
 function identity(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const get=type=>parts.find(p=>p.type===type).value;const day=`${get('year')}-${get('month')}-${get('day')}`;if(day===currentDay&&visitor)return visitor;currentDay=day;try{const saved=JSON.parse(localStorage.getItem('taywine-analytics-browser')||'null');if(saved?.day===day&&/^[a-f0-9-]{36}$/.test(saved.id))visitor=saved.id;else{visitor=crypto.randomUUID();localStorage.setItem('taywine-analytics-browser',JSON.stringify({day,id:visitor}))}}catch{visitor=crypto.randomUUID()}return visitor}
 function record(kind,songId){if(document.visibilityState==='hidden')return;try{const device=innerWidth<640?'mobile':innerWidth<1024?'tablet':'desktop';fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventId:crypto.randomUUID(),visitorId:identity(),kind,songId,device}),keepalive:true}).catch(()=>{})}catch{}}
 function page(){if(!sentPage&&document.visibilityState==='visible'){sentPage=true;record('page_view')}}
 document.addEventListener('visibilitychange',page);page();
 window.TayWineAnalytics={songOpened:id=>record('song_open',id)};
})();
