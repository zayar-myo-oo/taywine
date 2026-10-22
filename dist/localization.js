/* Local UI translations. Song titles, credits, lyrics and chord symbols are never translated. */
(() => {
 const pairs=[
 ['ရှာဖွေမယ်','Discover'],['သီချင်းအားလုံး','All songs'],['အဆိုတော်များ','Artists'],['သီချင်းစာအုပ်','My songbook'],
 ['သင့်ရဲ့ ဂီတနေရာလေး','YOUR MUSIC SPACE'],['ကိုယ့်အချိန်လေးအတွက်','MADE FOR THE MOMENT'],['တစ်ပုဒ်လောက်','One more song.'],['တီးကြည့်ရအောင်။','Just for you.'],
 ['ဂစ်တာတစ်လက်။ သီချင်းတစ်ပုဒ်။','A guitar. A song.'],['ကိုယ့်အတွက် အချိန်လေးတစ်ခု။','A little time for yourself.'],['ကံစမ်းပြီး ရွေးမယ်','Surprise me'],
 ['မြန်မာ့ဂီတကို ချစ်သူများအတွက်','Made for Myanmar music'],['နေ့စဉ် နားဆင်စရာ သီချင်းလေးတွေ','Your daily dose of music'],['စူးစမ်းပါ။ ဆက်တီးပါ။','Stay curious. Keep playing.'],
 ['နောက်ထပ် အကြိုက်ဆုံးသီချင်းကို ရှာဖွေပါ','FIND YOUR NEXT FAVORITE'],['သီချင်းတစ်ပုဒ်၊','A song for'],['ခံစားချက်တစ်ခု။','every feeling.'],
 ['ချစ်တဲ့သီချင်းတွေကို ရှာဖွေပါ။ ဂစ်တာတစ်လက်နဲ့ ကိုယ့်အချိန်လေးကို ဖန်တီးလိုက်ပါ။','Find the songs you love. Pick up your guitar and make a little time for yourself.'],
 ['ချစ်ခြင်းဖြင့် ဖန်တီးထားသည်','MADE WITH'],['မြန်မာ့ဂီတအတွက်','FOR MYANMAR MUSIC'],['ကောင်းမွန်တဲ့ဂီတ။','GOOD MUSIC.'],['နွေးထွေးတဲ့အဖော်။','GREAT COMPANY.'],['သီချင်းနာမည်၊ အဆိုတော်နာမည်ဖြင့် ရှာဖွေပါ…','Search songs, artists or keys…'],
 ['သင့်ရဲ့နောက်တစ်ပုဒ် ဒီမှာရှိပါတယ်။','YOUR NEXT SONG IS IN HERE.'],['သီချင်းများ ရယူနေပါသည်…','Loading your song collection…'],
 ['အက်ကူးစတစ် ဂီတဝိုင်းလေး','THE ACOUSTIC CORNER'],['ကြိုးခြောက်ချောင်းနဲ့','Six strings.'],['ပြောမယ့်','Endless'],['စကားတွေ။','stories.'],
 ['ရင်ထဲရောက်ခဲ့တဲ့ သီချင်းတွေကို','The songs that stayed with you.'],['ဒီတစ်ခါ ကိုယ်တိုင်တီးပြီး ပြန်ဆိုကြည့်ပါ။','Now make them your own.'],['ဒီနေ့ ဘာသီချင်းတီးမလဲ','Find my next song'],
 ['ခဏနားပါ။ ဖြည်းဖြည်းလေး တီးပါ။','UNPLUG. SLOW DOWN. PLAY.'],['အချိန်လေး','A little'],['ခဏ။','pause.'],['ခံစားချက်တိုင်းအတွက် သီချင်းတစ်ပုဒ်','A SONG FOR EVERY YOU'],
 ['ဒီနေ့ ဘယ်လို ခံစားနေရလဲ။','What feels like you today?'],['ခံစားချက်ရွေးပါ။ သီချင်းတစ်ပုဒ် ရှာတွေ့ပါ။','Pick a mood. Find a melody.'],
 ['အေးအေးဆေးဆေး','Unwind'],['အချစ်သီချင်းများ','Love songs'],['အသစ်တစ်ခုခု','Something new'],['လွယ်လွယ်တီးရင်း အေးချမ်းတဲ့မနက်ခင်း','Easy chords, easy mornings'],
 ['အချစ်နည်းနည်း၊ သံစဉ်လေးနည်းနည်း','A little love, a little melody'],['မထင်မှတ်ထားတဲ့ သီချင်းတစ်ပုဒ်','Find something unexpected'],
 ['နောက်ထပ် တီးကြည့်မယ့်သီချင်း','YOUR NEXT PLAY'],['တီးချင်စရာ သီချင်းတွေ','Songs to play next'],['သီချင်းအားလုံး ကြည့်မယ်','Browse all songs'],
 ['ဂစ်တာနဲ့ တီးကြည့်မယ်','Acoustic picks'],['သီချင်းစာရင်း ရယူနေပါသည်…','Loading songs…'],['အားလုံး','All'],['Chords ပါသော','With chords'],['စာသားသီးသန့်','Lyrics only'],['စီရန်','Sort by'],['မူလအစီအစဉ်','Recommended order'],['သီချင်းနာမည်','Song title'],['အဆိုတော်','Artist'],
 ['မူရင်းလူကြည့်အများဆုံး','Most viewed at source'],['အသစ်ဆုံး','Newest first'],['သီချင်း / SONG','SONG'],['အဆိုတော် / ARTIST','ARTIST'],
 ['နောက်ထပ် ကြည့်မယ်','Load more songs'],['တီးနေသရွေ့၊ သီချင်းတွေ အသက်ဝင်နေမယ်။','Keep playing. Keep the music alive.'],['ချစ်တဲ့သီချင်းတွေကို အနီးမှာထားပါ။ ကိုယ့်ဟန်နဲ့ တီးခတ်ပါ။','Keep the songs you love close. Make them your own.'],
 ['ဂီတနဲ့ ပိုနီးစပ်လာဖို့။','A little closer to the music.'],['မြန်မာ့ဂီတအတွက် ချစ်ခြင်းနဲ့ ဖန်တီးထားသည်','MADE WITH ♡ FOR MYANMAR MUSIC'],
 ['သီချင်းစာရင်းသို့','Back to songs'],['ကိုယ်ပိုင် songbook လေး စလိုက်ရအောင်။','Make this songbook yours.'],['သီချင်းဘေးက ♡ ကို နှိပ်ပြီး သိမ်းထားနိုင်ပါတယ်။','Tap the heart beside a song to save it here.'],
 ['သီချင်း မတွေ့သေးပါ။','No songs found.'],['အခြားသီချင်းနာမည် သို့မဟုတ် အဆိုတော်နာမည်နဲ့ ရှာကြည့်ပါ။','Try another song title, artist or key.'],['အဆိုတော် မတွေ့ပါ။','No artists found.'],
 ['ကိုယ့်အကြိုက် သီချင်းများ','Your saved songs'],['ကိုယ်ပိုင်သီချင်းစာအုပ်','YOUR PERSONAL SONGBOOK'],['အဆိုတော်၏ သီချင်းများ','ARTIST SONGBOOK'],
 ['Songbook ထဲ သိမ်းထားသည်','Saved to songbook'],['Songbook ထဲ သိမ်းမယ်','Save to songbook'],['Songbook ထဲ သိမ်းပြီးပါပြီ','Added to your songbook'],['Songbook မှ ဖယ်ပြီးပါပြီ','Removed from your songbook'],
 ['သီချင်းဖွင့်နေပါသည်…','Opening your song…'],['သီချင်းဖွင့်လို့ မရသေးပါ။','This song could not be opened.'],['စာရင်းသို့ပြန်သွားပြီး ထပ်ဖွင့်ကြည့်ပါ။','Go back to the collection and try again.'],
 ['မူရင်း key','Original key'],['စာသားနှင့် Chords','Chords + Lyrics'],['မူရင်းစာသားနှင့် Chords','CHORDS + LYRICS'],['စာသား','LYRICS'],
 ['ကီး','KEY'],['စာလုံး','TEXT'],['အလိုအလျောက် စာမျက်နှာရွှေ့ခြင်း','AUTO-SCROLL'],['ရပ်ထားသည်','Paused'],['စတင်မယ်','Start'],['ခဏရပ်မယ်','Pause'],
 ['0.1× · နှေး','0.1× · Slow'],['10× · မြန်','10× · Fast'],['မူလ 1×','Reset 1×'],['အမြန်နှုန်းကို နံပါတ်ရိုက်ထည့်ပါ၊ slider ဆွဲပါ၊ သို့မဟုတ် − / + နှိပ်ပါ။','Type a speed, drag the slider, or use the − / + buttons.'],
 ['ပုံနှိပ်မယ်','Print'],['Link ကူးမယ်','Copy link'],['သီချင်း link ကူးပြီးပါပြီ','Song link copied'],['Browser address bar မှ link ကို ကူးယူနိုင်ပါတယ်။','You can copy this song link from your address bar.'],
 ['သီချင်းစာရင်း ဖွင့်မရပါ','Song collection unavailable'],['စာရင်းဖွင့်မရသေးပါ။','We could not load your collection.'],['အင်တာနက် စစ်ပြီး စာမျက်နှာကို ပြန်ဖွင့်ကြည့်ပါ။','Check your connection and refresh the page.'],
 ['အသုံးပြုထားသော chords','Chords in this song'],['နှိပ်ပြီး လက်ကွက်ကြည့်ပါ','Tap a chord to see its shape'],['ဂစ်တာလက်ကွက် အညွှန်း','GUITAR CHORD REFERENCE'],
 ['Chord shapes','လက်ကွက်များ'],['ယခင်လက်ကွက်','Previous chord shape'],['နောက်လက်ကွက်','Next chord shape'],['ဒီ chord အတွက် လက်ကွက်မထည့်ရသေးပါ။','A diagram is not available for this chord yet.'],['Chord နာမည်ကို မူရင်းအတိုင်း ဖော်ပြထားပါတယ်။','The chord name is shown as written.'],
 ['မတီးရ · ○ ကြိုးလွတ်','Muted · ○ Open string'],['တိတ်တဆိတ် ဖတ်မယ်','Focus mode'],['ပုံမှန်ပုံစံသို့','Exit focus'],['Focus mode ထွက်မယ်','Leave focus mode'],
 ['ပုံထည့်မယ်','Add artwork'],['ပုံဖယ်မယ်','Remove artwork'],['ဂီတအလှပုံ','Music artwork'],['ပုံသိမ်းဖို့ နေရာမလုံလောက်ပါ။ သိမ်းထားတဲ့ပုံအချို့ကို ဖယ်ပြီး ပြန်စမ်းပါ။','Your browser storage is full. Remove some saved artwork and try again.'],
 ['ကိုယ်ထည့်ထားတဲ့ပုံ ဖယ်ပြီးပါပြီ','Your custom artwork was removed'],['JPG၊ PNG သို့မဟုတ် WebP ပုံကို ရွေးပေးပါ။','Choose a JPG, PNG or WebP image.'],['10 MB အောက် ပုံကို ရွေးပေးပါ။','Choose an image smaller than 10 MB.'],
 ['သီချင်းပုံ ထည့်ပြီးပါပြီ','Artwork added'],['ပုံဖွင့်မရပါ။ အခြားပုံတစ်ပုံ ရွေးကြည့်ပါ။','This image could not be opened. Try another image.'],
 ['ကိုယ်ထည့်ထားတဲ့ ပုံနဲ့ link ကို ဒီ browser ထဲမှာ သိမ်းထားပါတယ်။','Your custom artwork and links stay in this browser.'],
 ['ပြန်ပြန်နားထောင်ချင်မယ့် သီချင်း','YOUR NEXT REPEAT'],['နားထောင်ပါ။ ခံစားပါ။ တီးကြည့်ပါ။','Listen. Feel it. Make it yours.'],
 ['သီချင်းမသိသေးလည်း ရပါတယ်။ ဘေးက player မှာ နားထောင်ရင်း လိုက်တီးနိုင်ပါတယ်။','Not familiar with the song? Open the mini player and learn as you listen.'],
 ['YouTube နားထောင်မယ်','Listen on YouTube'],['နောက်တစ်ပုဒ် ကံစမ်းမယ်','Shuffle a song'],['YouTube link ထည့်မယ် / ပြောင်းမယ်','Add or change a YouTube link'],['ဖွင့်မယ်','Open video'],
 ['YouTube မှာ ရှာမယ်','Search YouTube'],['YouTube မှာ ဖွင့်မယ်','Watch on YouTube'],['မှန်ကန်တဲ့ YouTube video link ကို ထည့်ပေးပါ။','Enter a valid YouTube video link.'],['YouTube link သိမ်းပြီးပါပြီ','YouTube link saved'],
 ['ဒီသီချင်းကို အတူရှာကြမယ်။','Let’s find this song.'],['အောက်က “YouTube မှာ ရှာမယ်” ကိုနှိပ်ပြီး','Choose “Search YouTube” below, then'],['ကြိုက်တဲ့ video link ကို ဒီမှာ ထည့်ပေးပါ။','paste your preferred video link here.'],
 ['သီချင်းက သင့်ကို ရှာတွေ့ပါစေ','LET THE MUSIC FIND YOU'],['ဒီနေ့ သင့်အတွက် ဘာသီချင်းလဲ။','What’s your song today?'],['ရွေးရခက်ရင် ကံကြမ္မာလေးကို ရွေးခိုင်းလိုက်ပါ။','Can’t decide? Let a little chance find your next song.'],
 ['ထပ်ကံစမ်းမယ်','Shuffle again'],['ဒီသီချင်း တီးမယ်','Play this song'],['သင့်အတွက် သီချင်းရွေးနေပါတယ်…','Finding a song for you…'],['သီချင်းစာရင်း ဖွင့်ပြီးမှ ထပ်စမ်းပေးပါ။','Try again once the song collection has loaded.'],['သီချင်းစာရင်း ရယူနေပါသည်။ ခဏနေ ပြန်စမ်းပါ။','Your collection is loading. Try again in a moment.'],
 ['နားထောင်ပါ။ လေ့လာပါ။ ကိုယ့်ဟန်နဲ့ တီးခတ်ပါ။','LISTEN. LEARN. MAKE IT YOURS.'],['နားထောင်ရင်း တီးကြည့်မယ်။','Listen first. Play along.'],['CHORDS + VIDEO','CHORDS + VIDEO'],
 ['အချိန်ပေးတီးချင်မယ့် သီချင်းတစ်ပုဒ်','FIND A SONG WORTH STAYING FOR'],['ဒီတစ်ခါ ဘာတီးကြမလဲ။','Find your next session.'],['လူကြည့်အများဆုံး','Most viewed'],['လတ်တလော ရွေးချယ်စရာ','Trending picks'],
 ['အသစ်ထည့်ထားသော','Recently added'],['စတင်တီးခတ်သူများ','Beginner friendly'],['ပြန်ဆက်ဖတ်မယ်','Continue playing'],['လတ်တလော လူကြည့်များ','Recently popular'],['မကြာသေးခင်ဖွင့်ထားသော','Recently opened'],['အသစ်ဆုံးသီချင်းများ','Newest songs'],['စတင်တီးခတ်သူများအတွက်','Easy songs to start with'],
 ['MusiBurma မူရင်းဆိုဒ်၏ စုစုပေါင်းကြည့်ရှုမှုအရ စီထားပါသည်။ TAYWINE ၏ ကြည့်ရှုမှု မဟုတ်ပါ။','Ranked by total views on MusiBurma, not by visits to TayWine.'],
 ['ပြီးခဲ့သည့် ရက် ၉၀ အတွင်း မူရင်းဆိုဒ်မှာတင်ထားသော သီချင်းများကို စုစုပေါင်းကြည့်ရှုမှုအရ ရွေးထားပါသည်။','Songs added at the source in the last 90 days, ranked by their total views.'],
 ['မူရင်းဆိုဒ်မှာ တင်ထားသည့်နေ့အလိုက် အသစ်ဆုံးသီချင်းများ။','The latest additions, ordered by their original publication date.'],
 ['ဒီ browser မှာ မကြာသေးခင် ဖွင့်ခဲ့တဲ့သီချင်းတွေ။ ဖတ်လက်စနေရာကနေ ပြန်ဆက်နိုင်ပါတယ်။','Songs you recently opened in this browser. Pick up where you left off.'],
 ['Chord ၅ ခုအထိသာပါပြီး open chords နဲ့ တီးလို့ရတဲ့ သီချင်းများ။','Songs with up to five open chords: a comfortable place to start.'],
 ['သီချင်းတစ်ပုဒ် ဖွင့်ပြီး ကိုယ်ပိုင် reading history လေး စလိုက်ပါ။','Open a song to start your own recent-play history.'],
 ['ဒီအမျိုးအစားအတွက် အချက်အလက် မရှိသေးပါ။ “လူကြည့်အများဆုံး” မှာ သီချင်းတွေ ရွေးနိုင်ပါတယ်။','No songs are available in this category yet. Explore “Most viewed” instead.'],
 ['Trending picks သည် မကြာသေးခင်တင်ထားသော လူကြည့်များသီချင်းများဖြစ်ပြီး live viral chart မဟုတ်ပါ။','Trending picks highlights popular recent additions; it is not a live viral chart.'],
 ['မူရင်းကြည့်ရှုမှုအရေအတွက်ကို နောက်ဆုံးရယူထားသည့်အချိန်အထိသာ ဖော်ပြထားပါသည်။','Source view counts reflect the latest imported snapshot.'],
 ['စာရင်းအပြည့် ကြည့်မယ်','Explore this collection'],['မကြာသေးခင် ဖွင့်ထားသော','Recently played'],['ဖတ်လက်စနေရာသို့','Resume where I left off'],
 ['စာသားနဲ့ chord တွေကို မူရင်းစာမျက်နှာအတိုင်း ဖော်ပြထားပါသည်။','Lyrics and chords are shown as supplied by the original source.'],
 ['ရှာထားတာ ရှင်းမယ်','Clear search'],['အမှောင် / အလင်း ပြောင်းမယ်','Toggle dark mode'],['သိမ်းထားရာမှ ဖယ်မယ်','Remove from songbook'],['ကိုယ်ပိုင်စာအုပ်ထဲ သိမ်းမယ်','Save to songbook'],
 ['ကီး တစ်ဆင့်နှိမ့်မယ်','Transpose down'],['ကီး တစ်ဆင့်မြှင့်မယ်','Transpose up'],['စာလုံးသေးမယ်','Smaller text'],['စာလုံးကြီးမယ်','Larger text'],
 ['Auto-scroll စတင်မယ်','Start auto-scroll'],['Auto-scroll ခဏရပ်မယ်','Pause auto-scroll'],['ရွှေ့နှုန်း လျှော့မယ်','Decrease scroll speed'],['ရွှေ့နှုန်း တိုးမယ်','Increase scroll speed'],['မူလ 1× သို့ ပြန်ထားမယ်','Reset speed to 1x'],
 ['စာမျက်နှာရွှေ့ အမြန်နှုန်း','Scroll speed multiplier'],['စာမျက်နှာရွှေ့နှုန်း ချိန်မယ်','Adjust scroll speed'],['သီချင်းကို ပုံနှိပ်မယ်','Print song'],['သီချင်း link ကူးမယ်','Copy song link'],
 ['YouTube အသံဖွင့်စက်','YouTube listening companion'],['YouTube link ချိန်ညှိရန်','YouTube link settings'],['Player သေးမယ်','Minimize player'],['Player ပြန်ချဲ့မယ်','Expand player'],['Player ပိတ်မယ်','Close player'],
 ['ကံစမ်းစာမျက်နှာ ပိတ်မယ်','Close random song'],['Chord လက်ကွက် ပိတ်မယ်','Close chord diagram'],['သီချင်းရွေးချယ်မှု','Discover songs'],['Auto-scroll ချိန်ညှိရန်','Auto-scroll controls'],['သီချင်းစာသားနှင့် chords','Song lyrics and chords']
 ];
 const lookup=new Map();for(const [my,en] of pairs){const item={my,en};if(!lookup.has(my))lookup.set(my,item);if(!lookup.has(en))lookup.set(en,item)}
 let language='my';try{const stored=localStorage.getItem('taywine-language');if(stored==='en'||stored==='my')language=stored}catch{}
 const sourceText=new WeakMap(),sourceAttributes=new WeakMap();
 const protectedSelector='[data-no-i18n],#sheet,svg,script,style,textarea,.song-title,.song-credit,.artist-cell,.reader-artist,.reader-top h1,.artist-card b,.pick-title,.pick-details>span,.chart-song-info>b,.chart-song-info>span,#player-title,#player-artist,#chord-dialog-title,#draw-result h3,#draw-result p,.fret-values,.chord-chip-list';
 function phrase(value,locale){const item=lookup.get(value);return item?item[locale]:null}
 function dynamic(value,locale){let m;if((m=value.match(/^([\d,]+) သီချင်း · ([\d,]+) အဆိုတော်$/)))return locale==='en'?`${m[1]} ${m[1]==='1'?'song':'songs'} · ${m[2]} ${m[2]==='1'?'artist':'artists'}`:value;
  if((m=value.match(/^([\d,]+) ပုဒ်အနက် ([\d,]+) ပုဒ် ပြထားသည်$/)))return locale==='en'?`Showing ${m[2]} of ${m[1]} ${m[1]==='1'?'song':'songs'}`:value;
  if((m=value.match(/^([\d,.]+[KM]?) ပုဒ်၏ မူရင်းအချက်အလက်$/)))return locale==='en'?`${m[1]} songs with source data`:value;
  if((m=value.match(/^([\d,.]+[KM]?) ကြည့်ရှုမှု$/)))return locale==='en'?`${m[1]} source views`:value;
  if((m=value.match(/^(\d+)% ဖတ်ပြီး · ဆက်ဖတ်မယ်$/)))return locale==='en'?`${m[1]}% read · Continue`:value;
  if((m=value.match(/^ပြီးခဲ့တဲ့တစ်ခါ (\d+)% အထိ ဖတ်ထားပါတယ်။$/)))return locale==='en'?`You last read ${m[1]}% of this song.`:value;
  if((m=value.match(/^(\d+) songs$/)))return locale==='my'?`${m[1]} ပုဒ်`:+m[1]===1?'1 song':value;
  if((m=value.match(/^(\d+) chords · Open chords$/)))return locale==='my'?`Open chords ${m[1]} ခု`:value;
  if((m=value.match(/^Playing · ([\d.]+)×$/)))return locale==='my'?`ဖွင့်နေသည် · ${m[1]}×`:value;
  if((m=value.match(/^([+-]?\d+) semitones$/)))return locale==='my'?`ကီး ${m[1]} ဆင့်`:Math.abs(+m[1])===1?`${m[1]} semitone`:value;
  if((m=value.match(/^မူရင်း key: (.*?) · Source:$/)))return locale==='en'?`Original key: ${m[1]} · Source:`:value;
  if((m=value.match(/^(.*?) chords ဖွင့်မယ်$/)))return locale==='en'?`Open chords for ${m[1]}`:value;
  if((m=value.match(/^(.*?) နားထောင်မယ်$/)))return locale==='en'?`Listen to ${m[1]}`:value;
  if((m=value.match(/^(.*?) guitar chord diagram$/)))return locale==='my'?`${m[1]} ဂစ်တာလက်ကွက်`:value;
  if((m=value.match(/^(.*?) cover$/)))return locale==='my'?`${m[1]} မျက်နှာဖုံးပုံ`:value;
  if((m=value.match(/^([\d.]+) times speed$/)))return locale==='my'?`အမြန်နှုန်း ${m[1]} ဆ`:value;
  if((m=value.match(/^Standard tuning: E A D G B e$/)))return locale==='my'?'ပုံမှန် ကြိုးညှိမှု: E A D G B e':value;
  if(value==='TAYWINE SONGBOOK / CHORDS & LYRICS')return locale==='my'?'TAYWINE သီချင်းစာအုပ် / စာသားနှင့် chords':value;
  if(value==='TAYWINE SONGBOOK / LYRICS')return locale==='my'?'TAYWINE သီချင်းစာအုပ် / စာသား':value;
  if(/^\d{1,2} [A-Za-z]{3} \d{4}$/.test(value)&&locale==='my'){const date=new Date(value);if(!Number.isNaN(date.getTime()))return new Intl.DateTimeFormat('my-MM',{day:'numeric',month:'short',year:'numeric'}).format(date)}
  return null;
 }
 function translateText(value,locale=language){if(!value||!value.trim())return value;const leading=value.match(/^\s*/)[0],trailing=value.match(/\s*$/)[0],trimmed=value.trim();let translated=phrase(trimmed,locale)??dynamic(trimmed,locale);if(translated===null){const prefix=trimmed.match(/^[◈♫♬♪♧♡♥⚄▶▷Ⅱ⌕☀✳✦✧↗↙←↓＋×◐]+\s*/)?.[0]||'';const suffix=trimmed.match(/\s*[◈♫♬♪♧♡♥⚄▶▷Ⅱ⌕☀✳✦✧↗↙←↓＋×◐]+$/)?.[0]||'';const core=trimmed.slice(prefix.length,suffix?trimmed.length-suffix.length:undefined).trim();const target=phrase(core,locale)??dynamic(core,locale);if(target!==null)translated=prefix+target+suffix}return translated===null?value:leading+translated+trailing}
 function translateNode(node){if(node.nodeType!==3||!node.parentElement||node.parentElement.closest(protectedSelector))return;const current=node.nodeValue;let record=sourceText.get(node);if(!record||record.last!==current)record={source:current,last:current};const target=translateText(record.source);record.last=target;sourceText.set(node,record);if(current!==target)node.nodeValue=target}
 function translateAttributes(element){if(element.closest('[data-no-i18n],#sheet,svg,script,style'))return;let records=sourceAttributes.get(element);if(!records){records={};sourceAttributes.set(element,records)}for(const attribute of ['placeholder','aria-label','title','alt']){if(!element.hasAttribute(attribute))continue;const current=element.getAttribute(attribute);let record=records[attribute];if(!record||record.last!==current)record={source:current,last:current};const target=translateText(record.source);record.last=target;records[attribute]=record;if(current!==target)element.setAttribute(attribute,target)}}
 function translateTree(root){if(root.nodeType===3){translateNode(root);return}if(root.nodeType!==1||root.closest(protectedSelector))return;translateAttributes(root);const elements=root.querySelectorAll('[placeholder],[aria-label],[title],[alt]');elements.forEach(translateAttributes);const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(translateNode)}
 // Keeps whatever is under the sticky header in place while text above it changes length.
 let switchTimer;
 function viewportAnchor(){const top=Math.max(0,document.querySelector('header')?.getBoundingClientRect().bottom||0)+8;const hit=document.elementFromPoint(window.innerWidth/2,top)||document.elementFromPoint(24,top);if(!hit||hit===document.body||hit===document.documentElement)return null;if(hit.getBoundingClientRect().top>=top-40)return hit;for(const el of hit.querySelectorAll('*')){const r=el.getBoundingClientRect();if(r.height&&r.top>=top)return el}return hit}
 function setLanguage(next,announce=true){if(next!=='my'&&next!=='en')return;language=next;try{localStorage.setItem('taywine-language',next)}catch{}document.documentElement.lang=next;document.title=next==='en'?'TayWine — Myanmar Chords & Lyrics':'တေးဝိုင်း — TayWine | Myanmar Chords & Lyrics';const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=next==='en'?'Discover Myanmar songs, guitar chords and lyrics. Transpose, listen, and build your personal songbook.':'မြန်မာသီချင်းများ၊ ဂစ်တာ chords နဲ့ စာသားတွေကို ရှာဖွေပြီး ကိုယ်ပိုင်သီချင်းစာအုပ် ဖန်တီးပါ။';document.querySelectorAll('[data-set-lang]').forEach(button=>{const selected=button.dataset.setLang===next;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected))});const anchor=announce?viewportAnchor():null;const before=anchor?.getBoundingClientRect().top;translateTree(document.body);if(anchor&&anchor.isConnected){const shift=anchor.getBoundingClientRect().top-before;if(Math.abs(shift)>1)window.scrollBy({top:shift,behavior:'instant'})}if(announce){const root=document.documentElement;root.classList.remove('lang-switching');void root.offsetWidth;root.classList.add('lang-switching');clearTimeout(switchTimer);switchTimer=setTimeout(()=>root.classList.remove('lang-switching'),260);const live=document.getElementById('language-announcement');if(live)live.textContent=next==='en'?'Language changed to English':'မြန်မာဘာသာသို့ ပြောင်းပြီးပါပြီ';document.dispatchEvent(new CustomEvent('taywine:languagechange',{detail:{language:next}}))}}
 function init(){const header=document.querySelector('.header-right');if(header&&!document.getElementById('language-switch')){header.insertAdjacentHTML('afterbegin',`<div class="language-switch" id="language-switch" role="group" aria-label="Website language" data-no-i18n><span class="language-globe" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z"/></svg></span><button type="button" data-set-lang="en" lang="en" title="Switch to English">EN</button><button type="button" data-set-lang="my" lang="my" title="မြန်မာဘာသာသို့ ပြောင်းမယ်">မြန်မာ</button></div>`);header.querySelectorAll('[data-set-lang]').forEach(b=>b.onclick=()=>setLanguage(b.dataset.setLang));document.body.insertAdjacentHTML('beforeend','<span id="language-announcement" class="sr-only" role="status" aria-live="polite" data-no-i18n></span>')}
  setLanguage(language,false);const pending=new Set();let frame;const flush=()=>{frame=null;const roots=[...pending];pending.clear();roots.filter(root=>root.isConnected).forEach(translateTree)};new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')pending.add(record.target);else if(record.type==='attributes')pending.add(record.target);else for(const node of record.addedNodes)pending.add(node)}if(!frame&&pending.size)frame=requestAnimationFrame(flush)}).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title','alt']});
 }
 window.TayWineI18n={translateText,setLanguage,getLanguage:()=>language,translateTree};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
