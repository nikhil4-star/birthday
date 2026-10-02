const $ = (id) => document.getElementById(id);

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-back]").forEach(btn=>btn.addEventListener("click",()=>showPage(btn.dataset.back)));

$("unlockBtn").addEventListener("click",()=>{ showPage("page-password"); setTimeout(()=>$("passwordInput").focus(),300); });

$("passwordBtn").addEventListener("click",checkPassword);
$("passwordInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkPassword()});
function checkPassword(){
  const value=$("passwordInput").value.trim();
  if(value==="0301"){
    $("passwordHint").textContent="";
    $("passwordInput").value="";
    showPage("page-question");
  }else{
    $("passwordHint").textContent="";
    $("passwordInput").value="";
    showPage("page-wrong");
  }
}
$("tryAgain").addEventListener("click",()=>showPage("page-password"));

let noCount=0;
$("noBtn").addEventListener("click",()=>{
  noCount++;
  $("noMessage").textContent = noCount===1
    ? "How rude 😭 Go back and click on YES please! 💗"
    : "Nope 😂 This button has officially become shy. Please click YES. 🌷";
  $("noBtn").animate([{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],{duration:300});
});
$("yesBtn").addEventListener("click",()=>showPage("page-welcome"));
$("nextBook").addEventListener("click",()=>showPage("page-book"));

/* Live birthday countdown.
   Birthday label requested: 07/05 BS.
   Set the exact upcoming AD date below once the birthday year is known. */
const BIRTHDAY_AD_MONTH=4; // May (0-based)
const BIRTHDAY_AD_DAY=20;  // placeholder AD date for the live timer
function nextBirthday(){
  const now=new Date();
  let target=new Date(now.getFullYear(),BIRTHDAY_AD_MONTH,BIRTHDAY_AD_DAY,0,0,0);
  if(target<=now) target=new Date(now.getFullYear()+1,BIRTHDAY_AD_MONTH,BIRTHDAY_AD_DAY,0,0,0);
  return target;
}
function updateCountdown(){
  const diff=Math.max(0,nextBirthday()-new Date());
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff%86400000/3600000);
  const m=Math.floor(diff%3600000/60000);
  const s=Math.floor(diff%60000/1000);
  $("days").textContent=String(d).padStart(2,"0");
  $("hours").textContent=String(h).padStart(2,"0");
  $("mins").textContent=String(m).padStart(2,"0");
  $("secs").textContent=String(s).padStart(2,"0");
}
setInterval(updateCountdown,1000); updateCountdown();

/* 200-page love book */
const subjects=[
  ["Your Smile","Your smile has this unfair little talent: it can make an ordinary moment feel like a memory worth keeping."],
  ["Your Eyes","Your eyes are one of those details I could notice a hundred times and still notice something new."],
  ["Your Hair","Your hair is a tiny piece of your personality—sometimes neat, sometimes playful, always unmistakably you."],
  ["Your Nose","Yes, even your nose deserves a page. It is part of the face I recognize instantly and adore completely."],
  ["Your Laugh","Your laugh is the kind of sound that makes a room feel less serious."],
  ["Your Voice","There is comfort in hearing your voice, especially when the day has been too loud."],
  ["Your Kindness","The little ways you care about people say more about you than any grand gesture could."],
  ["Your Habits","Some habits are funny, some are adorable, and some are simply so 'you' that I would miss them."],
  ["Your Reactions","Your reactions can turn the smallest story into a whole event—and honestly, I love that."],
  ["Your Dreams","I hope you always have room for big dreams, silly dreams, and everything in between."],
  ["Your Style","Your style is not just clothes or colors. It is the way you make something yours."],
  ["Your Confidence","Whenever you believe in yourself, there is something quietly beautiful about it."],
  ["Your Soft Side","Behind every strong moment is a softer side that deserves to be protected."],
  ["Your Funny Side","You have a way of making ordinary conversations unexpectedly funny."],
  ["Your Favorite Things","The things you love are little windows into the person you are."],
  ["Your Patience","Even the way you wait, listen, or think can tell a story about your heart."],
  ["Your Curiosity","Your questions make conversations more interesting and your world more colorful."],
  ["Your Memories","The best memories are often made from tiny moments nobody planned."],
  ["Your Energy","Some days you bring sunshine without even trying."],
  ["Your Presence","Sometimes nothing needs to happen. Having you there is enough."],
  ["Your Courage","Courage does not always look dramatic. Sometimes it looks like simply trying again."],
  ["Your Honesty","There is beauty in being genuine, even when being genuine is not the easiest choice."],
  ["Your Imagination","Your imagination makes space for possibilities that ordinary thinking would miss."],
  ["Your Little Expressions","Tiny expressions become signatures when they belong to someone you know well."],
  ["Your Favorite Food","A favorite food can become a memory, a celebration, or an excuse for a happy conversation."],
  ["Your Favorite Place","The places you love say something about the kind of peace or excitement you enjoy."],
  ["Your Favorite Color","Colors become more special when they become connected to a person."],
  ["Your Favorite Song","Sometimes a song becomes special simply because it reminds you of a moment."],
  ["Your Favorite Movie","The stories you choose can reveal what makes you laugh, dream, or feel."],
  ["Your Friendship","A good friendship is built from trust, jokes, patience, and showing up."],
  ["Your Strength","You have more strength than you probably give yourself credit for."],
  ["Your Growth","The person you are becoming deserves just as much appreciation as the person you are today."],
  ["Your Small Wins","Small wins still count. They are proof that progress can be quiet."],
  ["Your Big Wins","When something matters to you and you achieve it, the happiness is worth celebrating."],
  ["Your Bad Days","Even on bad days, you are still worthy of patience, kindness, and care."],
  ["Your Good Days","Good days become even better when there is someone to share them with."],
  ["Your Random Thoughts","Random thoughts can become the funniest conversations."],
  ["Your Messages","A simple message from you can change the mood of an entire day."],
  ["Your Good Morning","A good morning message is tiny, but the feeling behind it can be huge."],
  ["Your Good Night","There is something peaceful about ending a day knowing someone special is thinking of you."]
];
const fillers=[
  "This page is a reminder that the smallest details can become the most memorable ones.",
  "If this were a real paper book, I would probably keep adding little notes in the margins.",
  "There is no perfect way to describe a person you care about, so this page simply says: you matter.",
  "Some things are difficult to put into words. That is why this book has 200 pages.",
  "The point is not perfection. The point is remembering the little things that make you, you."
];
let current=1;

function pageContent(n){
  if(n<=subjects.length){
    return {chapter:"Things I Notice",title:subjects[n-1][0],body:subjects[n-1][1]};
  }
  const cycle=n-subjects.length;
  const names=[
    "A Tiny Compliment","A Memory Waiting to Happen","Your Birthday","A Secret Smile",
    "One More Reason","A Page for Your Future","A Little Thank You","A Promise to Cheer You On",
    "A Silly Thought","The Way You Make Moments Special"
  ];
  return {
    chapter:"Little Pages of You",
    title:names[(cycle-1)%names.length],
    body:fillers[(cycle-1)%fillers.length]+" Page "+n+" exists because one page was never going to be enough."
  };
}
function renderBook(){
  const c=pageContent(current);
  $("pageCounter").textContent=`Page ${current} / 200`;
  $("chapter").textContent=c.chapter;
  $("bookTitle").textContent=c.title;
  $("bookBody").textContent=c.body;
  $("prevPage").disabled=current===1;
  $("nextPage").textContent=current===200?"Finish ❤️":"Next →";
}
$("openBook").addEventListener("click",()=>{
  $("bookCover").classList.add("hidden");
  $("bookPage").classList.remove("hidden");
  renderBook();
});
$("nextPage").addEventListener("click",()=>{
  if(current<200){current++;renderBook()}else{
    $("bookTitle").textContent="The End? 💗";
    $("bookBody").textContent="Not really. A 200-page book can end, but the little moments it was made from keep going. Happy almost-birthday, Ichchha.";
    $("nextPage").textContent="Read again ↺";
    $("nextPage").onclick=()=>{current=1;renderBook()};
  }
});
$("prevPage").addEventListener("click",()=>{if(current>1){current--;renderBook()}});

/* floating hearts */
function heart(){
  const h=document.createElement("span");h.className="heart";h.textContent=["❤","♡","💗","🌸"][Math.floor(Math.random()*4)];
  h.style.left=Math.random()*100+"%";h.style.setProperty("--drift",(Math.random()*160-80)+"px");
  h.style.animationDuration=(5+Math.random()*6)+"s";h.style.fontSize=(12+Math.random()*20)+"px";
  $("hearts").appendChild(h);setTimeout(()=>h.remove(),12000);
}
setInterval(heart,700);

// Extra birthday surprises
const surpriseMessages = {
  letter: "My love, if I could wrap one thing and give it to you forever, it would be every happy moment we haven't lived yet. Keep smiling, keep dreaming, and remember that you are deeply special. 💌❤️",
  reasons: "1. Your smile. 2. Your laugh. 3. Your little reactions. 4. Your voice. 5. Your kindness. 6. Your dreams. 7. Your funny side. 8. Your courage. 9. Your patience. 10. Your presence. 11. Your honesty. 12. Your energy. 13. Your soft heart. 14. Your little habits. 15. Your imagination. 16. Your strength. 17. Your memories. 18. Your friendship. 19. Your beautiful way of being you. 20. The way you make moments memorable. 21. Simply because you are you. 💗",
  wish: "May this birthday bring you peaceful mornings, ridiculous laughter, beautiful surprises, successful dreams, and a heart full of reasons to be happy. May your next chapter be even more beautiful than the last. 🌸🎂",
  promise: "A little promise: I will keep cheering for your dreams, celebrating your small wins, laughing at the silly moments, and reminding you that your happiness matters. 🤝💞"
};

$("surpriseBtn").addEventListener("click",()=>showPage("page-surprise"));

document.querySelectorAll(".surprise-tile").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const key=btn.dataset.surprise;
    $("surpriseResult").textContent=surpriseMessages[key];
    $("surpriseResult").classList.remove("hidden");
    for(let i=0;i<5;i++) setTimeout(heart,i*120);
  });
});

$("loveMeterBtn").addEventListener("click",()=>{
  $("loveMeter").classList.remove("hidden");
  $("loveMeterBtn").textContent="💗 Love unlocked";
});

$("birthdayPageBtn").addEventListener("click",()=>showPage("page-birthday"));

$("finalWishBtn").addEventListener("click",()=>{
  $("finalWish").textContent="Close your eyes, make your biggest wish, and keep it safe in your heart. ✨ May it come true. ❤️";
  for(let i=0;i<12;i++) setTimeout(heart,i*100);
});


// Memory Garden
$("memoryBtn").addEventListener("click",()=>showPage("page-memory"));

$("memorySurprise").addEventListener("click",()=>{
  const messages=[
    "🌸 A flower grew because some memories deserve to bloom forever.",
    "🌷 One day, this little garden will be full of real moments.",
    "🌹 Keep collecting beautiful days. The garden is only beginning.",
    "🌻 Your happiest memories are still waiting to happen."
  ];
  $("flowerMessage").textContent=messages[Math.floor(Math.random()*messages.length)];
  for(let i=0;i<8;i++) setTimeout(heart,i*100);
});

// Love fortune + random compliments
const fortunes=[
  "🔮 Your birthday year is officially reserved for more smiles, more memories, and more beautiful surprises.",
  "🔮 Forecast: 100% chance of someone making you smile today.",
  "🔮 Your future contains laughter, late-night conversations, unforgettable memories and cake. 🎂",
  "🔮 Warning: excessive happiness may occur around 2083/07/05. 💗"
];
const compliments=[
  "🌷 You have a smile that deserves its own page.",
  "🌷 You make ordinary moments feel less ordinary.",
  "🌷 You are wonderfully, unmistakably you.",
  "🌷 Some people are memorable without trying. You are one of them.",
  "🌷 If being adorable were a competition, this website would need more pages."
];

$("fortuneBtn").addEventListener("click",()=>{
  $("fortuneResult").textContent=fortunes[Math.floor(Math.random()*fortunes.length)];
});
$("complimentBtn").addEventListener("click",()=>{
  $("fortuneResult").textContent=compliments[Math.floor(Math.random()*compliments.length)];
});

// Heart game
$("heartGameBtn").addEventListener("click",()=>showPage("page-game"));
let gameScore=0, gameTimer=null;

function spawnGameHeart(){
  const arena=$("heartArena");
  const h=document.createElement("span");
  h.className="game-heart";
  h.textContent=["💗","❤️","💕","💖","💘"][Math.floor(Math.random()*5)];
  h.style.left=(5+Math.random()*85)+"%";
  h.style.top=(5+Math.random()*80)+"%";
  h.addEventListener("click",()=>{
    gameScore++;
    $("heartScore").textContent=gameScore;
    h.remove();
    if(gameScore>=10){
      clearInterval(gameTimer);
      arena.innerHTML="";
      $("gameMessage").textContent="🎉 You caught all my hearts! Okay, you win. But you still owe me a smile. ❤️";
      for(let i=0;i<20;i++) setTimeout(heart,i*80);
    } else {
      spawnGameHeart();
    }
  });
  arena.appendChild(h);
  setTimeout(()=>{if(h.isConnected) h.remove()},1800);
}

$("startGame").addEventListener("click",()=>{
  clearInterval(gameTimer);
  gameScore=0;
  $("heartScore").textContent="0";
  $("gameMessage").textContent="Catch them! 💘";
  $("heartArena").innerHTML="";
  spawnGameHeart();
  gameTimer=setInterval(()=>{
    if(gameScore<10) spawnGameHeart();
  },700);
});

// Final reveal typing effect
const finalText="There was one thing I wanted this little website to say louder than everything else: you are incredibly special, and I hope your birthday reminds you how loved and appreciated you are. ❤️";
let typingStarted=false;

function startTyping(){
  if(typingStarted)return;
  typingStarted=true;
  let i=0;
  const el=$("typingMessage");
  const timer=setInterval(()=>{
    el.textContent=finalText.slice(0,i++);
    if(i>finalText.length) clearInterval(timer);
  },28);
}

$("finalRevealBtn").addEventListener("click",()=>{
  showPage("page-final");
  startTyping();
});

$("revealBtn").addEventListener("click",()=>{
  $("finalReveal").classList.remove("hidden");
  $("revealBtn").classList.add("hidden");
  for(let i=0;i<30;i++) setTimeout(heart,i*70);
});


// Personal photo upload and private browser gallery
const PHOTO_STORAGE_KEY = "ichchhaBirthdayPhotos2083";

function getSavedPhotos(){
  try{
    return JSON.parse(localStorage.getItem(PHOTO_STORAGE_KEY) || "[]");
  }catch(e){
    return [];
  }
}

function savePhotos(photos){
  localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photos));
}

function renderPhotoGallery(){
  const photos = getSavedPhotos();
  const galleries = [$("photoGallery"), $("photoGalleryPage")].filter(Boolean);

  galleries.forEach(gallery=>{
    gallery.innerHTML = "";
    photos.forEach((src,index)=>{
      const card = document.createElement("div");
      card.className = "photo-card";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "My special memory " + (index+1);
      card.appendChild(img);

      const number = document.createElement("span");
      number.className = "photo-number";
      number.textContent = "Memory " + (index+1);
      card.appendChild(number);

      const remove = document.createElement("button");
      remove.className = "photo-delete";
      remove.textContent = "×";
      remove.title = "Remove this photo";
      remove.addEventListener("click",()=>{
        const updated = getSavedPhotos();
        updated.splice(index,1);
        savePhotos(updated);
        renderPhotoGallery();
      });
      card.appendChild(remove);

      gallery.appendChild(card);
    });
  });

  if($("photoCount")){
    $("photoCount").textContent = photos.length
      ? `${photos.length} special photo${photos.length===1?"":"s"} saved in this browser. 💗`
      : "No photos added yet.";
  }
}

function addPhotos(files){
  const imageFiles = [...files].filter(file=>file.type.startsWith("image/"));
  if(!imageFiles.length)return;

  const existing = getSavedPhotos();
  let pending = imageFiles.length;

  imageFiles.forEach(file=>{
    const reader = new FileReader();
    reader.onload = e=>{
      existing.push(e.target.result);
      pending--;
      if(pending===0){
        // Keep the newest 30 photos to avoid filling browser storage.
        savePhotos(existing.slice(-30));
        renderPhotoGallery();
      }
    };
    reader.readAsDataURL(file);
  });
}

if($("photoBtn")){
  $("photoBtn").addEventListener("click",()=>{
    showPage("page-photos");
    renderPhotoGallery();
  });
}

if($("photoInput")){
  $("photoInput").addEventListener("change",e=>{
    addPhotos(e.target.files);
    e.target.value="";
  });
}

if($("photoInputPage")){
  $("photoInputPage").addEventListener("change",e=>{
    addPhotos(e.target.files);
    e.target.value="";
  });
}

function clearAllPhotos(){
  if(getSavedPhotos().length && confirm("Remove all saved photos from this browser?")){
    localStorage.removeItem(PHOTO_STORAGE_KEY);
    renderPhotoGallery();
  }
}

if($("clearPhotosBtn")) $("clearPhotosBtn").addEventListener("click",clearAllPhotos);
if($("clearPhotosBtnPage")) $("clearPhotosBtnPage").addEventListener("click",clearAllPhotos);

renderPhotoGallery();


// Birthday Gift Selector
const GIFT_STORAGE_KEY = "ichchhaBirthdayGiftChoices2083";

const birthdayGifts = [
  {id:"dress",cat:"clothes",icon:"👗",name:"Pretty Dress",desc:"A dress in your favorite style"},
  {id:"hoodie",cat:"clothes",icon:"🧥",name:"Cute Hoodie",desc:"Soft and cozy everyday wear"},
  {id:"saree",cat:"clothes",icon:"🥻",name:"Beautiful Saree",desc:"A special traditional outfit"},
  {id:"kurti",cat:"clothes",icon:"👚",name:"Kurti Set",desc:"Cute kurti with matching style"},
  {id:"top",cat:"clothes",icon:"👕",name:"Cute Top",desc:"A top you would love to wear"},
  {id:"jeans",cat:"clothes",icon:"👖",name:"Jeans",desc:"Your preferred fit and style"},
  {id:"jacket",cat:"clothes",icon:"🧥",name:"Stylish Jacket",desc:"A trendy jacket"},
  {id:"pajamas",cat:"clothes",icon:"🩷",name:"Cute Pajamas",desc:"Comfy nightwear"},

  {id:"chocolatebox",cat:"chocolate",icon:"🍫",name:"Chocolate Box",desc:"A box full of favorite chocolates"},
  {id:"darkchoc",cat:"chocolate",icon:"🍫",name:"Dark Chocolate",desc:"Rich and delicious"},
  {id:"milkchoc",cat:"chocolate",icon:"🍫",name:"Milk Chocolate",desc:"Classic creamy chocolate"},
  {id:"truffles",cat:"chocolate",icon:"🍬",name:"Chocolate Truffles",desc:"Little bites of happiness"},
  {id:"ferrero",cat:"chocolate",icon:"🌰",name:"Hazelnut Chocolates",desc:"Crunchy and chocolatey"},
  {id:"customchoc",cat:"chocolate",icon:"🎀",name:"Chocolate Surprise",desc:"A mystery chocolate selection"},

  {id:"studs",cat:"earrings",icon:"✨",name:"Cute Stud Earrings",desc:"Small and elegant"},
  {id:"hoops",cat:"earrings",icon:"⭕",name:"Hoop Earrings",desc:"Classic hoop style"},
  {id:"drop",cat:"earrings",icon:"💎",name:"Drop Earrings",desc:"Elegant hanging design"},
  {id:"heartEarrings",cat:"earrings",icon:"💗",name:"Heart Earrings",desc:"Heart-shaped and romantic"},
  {id:"pearl",cat:"earrings",icon:"🤍",name:"Pearl Earrings",desc:"Simple pearl style"},
  {id:"flowerEarrings",cat:"earrings",icon:"🌸",name:"Flower Earrings",desc:"Pretty floral design"},

  {id:"simpleRing",cat:"rings",icon:"💍",name:"Simple Ring",desc:"Minimal everyday ring"},
  {id:"heartRing",cat:"rings",icon:"💗",name:"Heart Ring",desc:"A romantic heart design"},
  {id:"flowerRing",cat:"rings",icon:"🌸",name:"Flower Ring",desc:"Cute floral ring"},
  {id:"stoneRing",cat:"rings",icon:"💎",name:"Stone Ring",desc:"Sparkly statement style"},
  {id:"coupleRing",cat:"rings",icon:"💞",name:"Couple Ring",desc:"A matching couple style"},
  {id:"initialRing",cat:"rings",icon:"🔤",name:"Initial Ring",desc:"A personalized initial ring"},

  {id:"perfume",cat:"beauty",icon:"🌹",name:"Perfume",desc:"A fragrance you love"},
  {id:"lipstick",cat:"beauty",icon:"💄",name:"Lipstick",desc:"Your favorite shade"},
  {id:"skincare",cat:"beauty",icon:"🧴",name:"Skincare Set",desc:"A little self-care box"},
  {id:"makeup",cat:"beauty",icon:"💋",name:"Makeup Set",desc:"A cute makeup collection"},
  {id:"haircare",cat:"beauty",icon:"🎀",name:"Hair Care Set",desc:"Cute hair-care essentials"},

  {id:"teddy",cat:"cute",icon:"🧸",name:"Teddy Bear",desc:"A cuddly birthday friend"},
  {id:"flowerbouquet",cat:"cute",icon:"💐",name:"Flower Bouquet",desc:"A beautiful bouquet"},
  {id:"musicbox",cat:"cute",icon:"🎶",name:"Music Box",desc:"A tiny musical keepsake"},
  {id:"photoframe",cat:"cute",icon:"🖼️",name:"Photo Frame",desc:"For a favorite memory"},
  {id:"customkeychain",cat:"cute",icon:"🔑",name:"Cute Keychain",desc:"A little personalized gift"},

  {id:"watch",cat:"other",icon:"⌚",name:"Watch",desc:"A stylish everyday watch"},
  {id:"handbag",cat:"other",icon:"👜",name:"Handbag",desc:"A cute bag for every day"},
  {id:"wallet",cat:"other",icon:"👛",name:"Wallet",desc:"Small and practical"},
  {id:"shoes",cat:"other",icon:"👟",name:"Shoes",desc:"A pair in your favorite style"},
  {id:"phonecase",cat:"other",icon:"📱",name:"Cute Phone Case",desc:"A case matching your style"},
  {id:"customgift",cat:"other",icon:"🎁",name:"Mystery Gift",desc:"Let the surprise stay secret"}
];

let selectedBirthdayGifts = loadGiftChoices();
let activeGiftCategory = "all";

function loadGiftChoices(){
  try{return JSON.parse(localStorage.getItem(GIFT_STORAGE_KEY) || "[]");}
  catch(e){return [];}
}

function saveGiftChoices(){
  localStorage.setItem(GIFT_STORAGE_KEY, JSON.stringify(selectedBirthdayGifts));
}

function renderGiftGrid(){
  const grid = $("giftGrid");
  if(!grid)return;
  grid.innerHTML = "";

  const items = birthdayGifts.filter(g =>
    activeGiftCategory==="all" || g.cat===activeGiftCategory
  );

  items.forEach(g=>{
    const card = document.createElement("div");
    card.className = "gift-card" + (selectedBirthdayGifts.includes(g.id) ? " selected" : "");
    card.innerHTML = `
      <div class="gift-check">${selectedBirthdayGifts.includes(g.id) ? "✓" : "+"}</div>
      <div class="gift-icon">${g.icon}</div>
      <h3>${g.name}</h3>
      <p>${g.desc}</p>
    `;
    card.addEventListener("click",()=>{
      if(selectedBirthdayGifts.includes(g.id)){
        selectedBirthdayGifts = selectedBirthdayGifts.filter(id=>id!==g.id);
      }else{
        selectedBirthdayGifts.push(g.id);
      }
      saveGiftChoices();
      renderGiftGrid();
      renderGiftSummary();
    });
    grid.appendChild(card);
  });
}

function renderGiftSummary(){
  const wrap = $("selectedGifts");
  const count = $("giftCount");
  if(!wrap || !count)return;

  count.textContent = `${selectedBirthdayGifts.length} gift${selectedBirthdayGifts.length===1?"":"s"} selected 💗`;
  wrap.innerHTML = "";

  selectedBirthdayGifts.forEach(id=>{
    const g = birthdayGifts.find(x=>x.id===id);
    if(!g)return;
    const pill = document.createElement("div");
    pill.className = "selected-gift-pill";
    pill.textContent = `${g.icon} ${g.name}`;
    wrap.appendChild(pill);
  });

  if(!selectedBirthdayGifts.length){
    wrap.innerHTML = '<span class="selected-gift-pill">✨ Pick anything you would love!</span>';
  }
}

function initGiftSelector(){
  if(!$("giftGrid"))return;

  document.querySelectorAll(".gift-tab").forEach(tab=>{
    tab.addEventListener("click",()=>{
      document.querySelectorAll(".gift-tab").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");
      activeGiftCategory = tab.dataset.category;
      renderGiftGrid();
    });
  });

  renderGiftGrid();
  renderGiftSummary();
}

if($("giftBtn")){
  $("giftBtn").addEventListener("click",()=>{
    showPage("page-gifts");
    renderGiftGrid();
    renderGiftSummary();
  });
}

if($("saveGiftChoices")){
  $("saveGiftChoices").addEventListener("click",()=>{
    saveGiftChoices();
    if($("giftSavedMessage")){
      $("giftSavedMessage").textContent =
        selectedBirthdayGifts.length
        ? "💗 Saved! Your birthday gift wishlist is waiting for you."
        : "✨ Your wishlist is empty. Pick some gifts first!";
    }
  });
}

if($("clearGiftChoices")){
  $("clearGiftChoices").addEventListener("click",()=>{
    if(!selectedBirthdayGifts.length)return;
    if(confirm("Clear your birthday gift wishlist?")){
      selectedBirthdayGifts = [];
      saveGiftChoices();
      renderGiftGrid();
      renderGiftSummary();
      if($("giftSavedMessage")) $("giftSavedMessage").textContent = "🩷 Wishlist cleared.";
    }
  });
}

initGiftSelector();
