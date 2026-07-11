/* ---------------------------------------------
   CONFIG — edit these two lines whenever you like
--------------------------------------------- */
const BIRTHDAY_DATE = new Date('2026-07-20T00:00:00'); // <-- set her actual birthday here
const BIRTHDAY_DISPLAY = 'July 20'; // <-- shown in the little pill under the countdown

/* ---------------------------------------------
   The letter she'll find inside the envelope,
   revealed from her birthday onward. Edit freely —
   use a blank line for a paragraph break.
--------------------------------------------- */
const LOVE_LETTER = `Happy birthday to the person who makes my whole world softer.

I made this little countdown because I wanted you to feel celebrated every single day leading up to today — not just today. But especially today.

I hope this year brings you everything you deserve, and I hope you already know how loved you are.`;

/* ---------------------------------------------
   One little note per day of the countdown.
   Day 20 shows first, day 1 shows the day before,
   day 0 is birthday day itself.
   Edit these freely — make them yours.
--------------------------------------------- */
const NOTES = [
  "Happy birthday. Today is all about you. \u{1F389}",                         // 0
  "One more sleep. I can barely sit still.",                                     // 1
  "Two days left and I already know I'm going to spoil you.",                    // 2
  "Three. I keep thinking about your laugh.",                                    // 3
  "Four days out and I'm already planning your favorite breakfast.",             // 4
  "Five. You make ordinary days feel like something worth celebrating.",         // 5
  "Six days left, and I still can't believe I get to be yours.",                 // 6
  "A week away. I've been smiling about it all day.",                           // 7
  "Eight. Thinking of every reason you're worth celebrating.",                   // 8
  "Nine days. I love the way you see the world.",                               // 9
  "Ten! Halfway there and my excitement is not halved at all.",                  // 10
  "Eleven days out — I'm already picking out your favorite song for the day.",   // 11
  "Twelve. You are, quite simply, my favorite person.",                          // 12
  "Thirteen days left, and I'm already smiling thinking about it.",              // 13
  "Fourteen. Two weeks until we celebrate the best thing that ever happened to me.", // 14
  "Fifteen days. I love you more than I let on most days.",                      // 15
  "Sixteen. You deserve every good thing headed your way.",                      // 16
  "Seventeen days out, and I already can't wait to see your face light up.",     // 17
  "Eighteen. Every day with you feels like a little celebration already.",       // 18
  "Nineteen days left — the countdown officially begins.",                       // 19
  "Twenty days until your birthday. Let the countdown begin. \u2764\uFE0F"        // 20
];

/* ---------------------------------------------
   Countdown calculation
--------------------------------------------- */
function daysUntilBirthday(){
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(BIRTHDAY_DATE.getFullYear(), BIRTHDAY_DATE.getMonth(), BIRTHDAY_DATE.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((target - startOfToday) / msPerDay);
}

function renderCountdown(){
  const daysLeft = daysUntilBirthday();
  const numberEl = document.getElementById('countNumber');
  const labelEl = document.getElementById('countLabel');
  const noteEl = document.getElementById('noteOfDay');
  const pillEl = document.getElementById('datePill');
  const heroNoteEl = document.getElementById('heroNote');

  if (daysLeft > 0){
    numberEl.textContent = daysLeft;
    labelEl.textContent = daysLeft === 1 ? 'day until your birthday' : 'days until your birthday';
    pillEl.textContent = `Counting down to ${BIRTHDAY_DISPLAY}`;
    heroNoteEl.textContent = "Every day that passes, I get a little more excited to celebrate you.";
  } else if (daysLeft === 0){
    numberEl.textContent = '\u{1F382}';
    labelEl.textContent = 'happy birthday!';
    pillEl.textContent = "It's your day";
    heroNoteEl.textContent = "Today's the day. I hope it's as wonderful as you are.";
  } else {
    numberEl.textContent = '\u2764\uFE0F';
    labelEl.textContent = 'so glad we celebrated you';
    pillEl.textContent = BIRTHDAY_DISPLAY;
    heroNoteEl.textContent = "Here's to another year of you.";
  }

  const noteIndex = Math.min(Math.max(daysLeft, 0), NOTES.length - 1);
  noteEl.textContent = NOTES[noteIndex];

  daysLeftGlobal = daysLeft;
  updateEnvelopeLockState();
}

/* ---------------------------------------------
   Floating envelope + love letter modal
--------------------------------------------- */
let daysLeftGlobal = 0;

function updateEnvelopeLockState(){
  const envelope = document.getElementById('envelopeFloat');
  if (!envelope) return;

  if (daysLeftGlobal <= 0){
    envelope.classList.add('unlocked');
  } else {
    envelope.classList.remove('unlocked');
  }
}

function handleEnvelopeClick(){
  const envelope = document.getElementById('envelopeFloat');

  if (daysLeftGlobal > 0){
    showEnvelopeToast();
    envelope.classList.remove('shake');
    void envelope.offsetWidth; // restart the shake animation
    envelope.classList.add('shake');
  } else {
    openLetter();
  }
}

function showEnvelopeToast(){
  const toast = document.getElementById('envelopeToast');
  if (!toast) return;
  toast.classList.add('show');
  clearTimeout(showEnvelopeToast._timer);
  showEnvelopeToast._timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function openLetter(){
  const letterTextEl = document.getElementById('letterText');
  if (letterTextEl) letterTextEl.textContent = LOVE_LETTER;

  document.getElementById('letterModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLetter(){
  document.getElementById('letterModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------------------------------------------
   Ambient floating hearts
--------------------------------------------- */
function spawnHearts(){
  const container = document.getElementById('hearts');
  if (!container) return;
  const glyphs = ['\u2665', '\u2661'];
  const count = 14;

  for (let i = 0; i < count; i++){
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${0.9 + Math.random() * 1.2}rem`;
    heart.style.setProperty('--drift', `${(Math.random() * 60) - 30}px`);
    heart.style.animationDuration = `${8 + Math.random() * 8}s`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(heart);
  }
}

/* ---------------------------------------------
   Lightbox (tap a photo to view it full-screen)
--------------------------------------------- */
function openLightbox(imgEl){
  // don't open for broken/placeholder images
  if (imgEl.closest('.polaroid').classList.contains('placeholder')) return;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = imgEl.src;
  lightboxImg.alt = imgEl.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

renderCountdown();
spawnHearts();
