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
   Monthsary gift — a different note unlocks on the
   14th of each month. Index 0 = January, 11 = December.
   Edit any of these to make them yours.
--------------------------------------------- */
const MONTHSARY_MESSAGES = [
  "Happy monthsary. Another year, another January spent loving you.",
  "Happy monthsary. Cold days, warm heart — thanks to you.",
  "Happy monthsary. Spring's arriving and so is another month of us.",
  "Happy monthsary. Every month with you feels like a new favorite.",
  "Happy monthsary. Here's to more late-night talks and easy laughs.",
  "Happy monthsary. Summer's better because I get to share it with you.",
  "Happy monthsary. It's your birthday month, so consider yourself extra spoiled.",
  "Happy monthsary. Still choosing you, every single time.",
  "Happy monthsary. Another month closer to forever.",
  "Happy monthsary. The leaves are changing, but how I feel about you isn't.",
  "Happy monthsary. Grateful for you, this month and always.",
  "Happy monthsary. Closing out the year loving you more than when it started."
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
  updateGiftLockState();
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
  const envelope = document.getElementById('envelopeFloat');
  if (!toast || !envelope) return;
  positionToastNear(envelope, toast);
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
   Floating gift + monthsary note modal
--------------------------------------------- */
function isMonthsaryToday(){
  return new Date().getDate() === 14;
}

function updateGiftLockState(){
  const gift = document.getElementById('giftFloat');
  if (!gift) return;

  if (isMonthsaryToday()){
    gift.classList.add('unlocked');
  } else {
    gift.classList.remove('unlocked');
  }
}

function handleGiftClick(){
  const gift = document.getElementById('giftFloat');

  if (!isMonthsaryToday()){
    showGiftToast();
    gift.classList.remove('shake');
    void gift.offsetWidth; // restart the shake animation
    gift.classList.add('shake');
  } else {
    openGift();
  }
}

function showGiftToast(){
  const toast = document.getElementById('giftToast');
  const gift = document.getElementById('giftFloat');
  if (!toast || !gift) return;
  positionToastNear(gift, toast);
  toast.classList.add('show');
  clearTimeout(showGiftToast._timer);
  showGiftToast._timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function openGift(){
  const giftTextEl = document.getElementById('giftText');
  const monthIndex = new Date().getMonth();
  if (giftTextEl) giftTextEl.textContent = MONTHSARY_MESSAGES[monthIndex];

  document.getElementById('giftModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGift(){
  document.getElementById('giftModal').classList.remove('open');
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

/* ---------------------------------------------
   Makes a floating object (envelope/gift) draggable
   with mouse, trackpad, or touch, while still telling
   a genuine tap from a drag apart.
--------------------------------------------- */
function makeDraggable(el, onTap, getHome){
  if (!el) return;

  let startX = 0, startY = 0, originLeft = 0, originTop = 0, dragged = false;
  const DRAG_THRESHOLD = 6; // px of movement before it counts as a drag, not a tap

  el.addEventListener('pointerdown', (e) => {
    const rect = el.getBoundingClientRect();
    originLeft = rect.left;
    originTop = rect.top;
    startX = e.clientX;
    startY = e.clientY;
    dragged = false;
    el.classList.remove('returning');
    el.classList.add('dragging');
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener('pointermove', (e) => {
    if (!el.classList.contains('dragging')) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) dragged = true;
    if (!dragged) return;

    const rect = el.getBoundingClientRect();
    const margin = 8;
    const maxLeft = window.innerWidth - rect.width - margin;
    const maxTop = window.innerHeight - rect.height - margin;
    const newLeft = Math.min(Math.max(originLeft + dx, margin), Math.max(maxLeft, margin));
    const newTop = Math.min(Math.max(originTop + dy, margin), Math.max(maxTop, margin));

    el.style.left = `${newLeft}px`;
    el.style.top = `${newTop}px`;
  });

  const endDrag = () => {
    if (!el.classList.contains('dragging')) return;
    el.classList.remove('dragging');

    if (!dragged){
      onTap();
      return;
    }

    // drifted off somewhere — ease it back home, like it's on a little string
    const home = getHome();
    el.classList.add('returning');
    el.style.left = `${home.left}px`;
    el.style.top = `${home.top}px`;

    el.addEventListener('transitionend', function onDone(){
      el.classList.remove('returning');
      el.removeEventListener('transitionend', onDone);
    }, { once: true });
  };

  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
}

function positionToastNear(el, toast){
  const rect = el.getBoundingClientRect();
  toast.style.left = `${rect.left + rect.width / 2}px`;

  // measure the toast so it can be centered/clamped once it has real dimensions
  toast.style.transform = 'translate(-50%, 0)';
  const toastRect = toast.getBoundingClientRect();
  const margin = 8;
  let left = rect.left + rect.width / 2;
  left = Math.min(Math.max(left, toastRect.width / 2 + margin), window.innerWidth - toastRect.width / 2 - margin);
  toast.style.left = `${left}px`;

  let top = rect.top - toastRect.height - 12;
  if (top < margin) top = rect.bottom + 12;
  toast.style.top = `${top}px`;
}

/* ---------------------------------------------
   Tap a polaroid's frame to cycle its color
   (tapping the photo itself still opens the lightbox)
--------------------------------------------- */
const POLAROID_COLORS = [
  '#FFFFFF', // default
  '#F6DFE3', // blush
  '#F7C9CE', // rose
  '#E3D3F0', // lavender
  '#D8F0E3', // mint
  '#FCE1C8', // peach
  '#D6E9F5', // sky blue
  '#FBEFC0', // butter yellow
  '#EAD9F7', // lilac
  '#F9D2C2'  // coral
];

function setupPolaroidColorCycle(){
  document.querySelectorAll('.polaroid').forEach((frame) => {
    let colorIndex = 0;
    frame.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') return; // photo taps open the lightbox instead
      colorIndex = (colorIndex + 1) % POLAROID_COLORS.length;
      frame.style.backgroundColor = POLAROID_COLORS[colorIndex];
    });
  });
}

renderCountdown();
spawnHearts();
setupPolaroidColorCycle();
makeDraggable(
  document.getElementById('envelopeFloat'),
  handleEnvelopeClick,
  () => ({ left: window.innerWidth - 84, top: window.innerHeight - 84 })
);
makeDraggable(
  document.getElementById('giftFloat'),
  handleGiftClick,
  () => ({ left: 20, top: window.innerHeight - 84 })
);

window.addEventListener('resize', () => {
  [document.getElementById('envelopeFloat'), document.getElementById('giftFloat')].forEach((el) => {
    if (!el || !el.style.left) return; // hasn't been dragged yet, leave it on its CSS default spot
    const rect = el.getBoundingClientRect();
    const margin = 8;
    const maxLeft = window.innerWidth - rect.width - margin;
    const maxTop = window.innerHeight - rect.height - margin;
    el.style.left = `${Math.min(Math.max(rect.left, margin), Math.max(maxLeft, margin))}px`;
    el.style.top = `${Math.min(Math.max(rect.top, margin), Math.max(maxTop, margin))}px`;
  });
});
