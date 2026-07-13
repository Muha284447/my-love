// ---------- Floating petals ----------
(function initPetals() {
  const container = document.getElementById('petals');
  const symbols = ['❤', '❥', '✧'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    petal.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    petal.style.animationDuration = (10 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(petal);
  }
})();

// ---------- Scroll reveal ----------
(function initReveal() {
  const targets = document.querySelectorAll('.reasons, .letter-section, .promises, .love-meter, .finale');
  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
})();

// ---------- Promise list staggered reveal ----------
(function initPromises() {
  const items = document.querySelectorAll('.promise-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = Array.from(items).indexOf(el) * 120;
          setTimeout(() => el.classList.add('is-visible'), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((el) => observer.observe(el));
})();

// ---------- Reasons ----------
(function initReasons() {
  const reasons = [
    "The way you laugh at your own jokes before you even finish telling them.",
    "Your mind — the way you notice things nobody else does.",
    "How safe and at home I feel whenever you're around.",
    "The way you get excited about the little things, and it makes me love the little things too.",
    "How fiercely you care about the people you love.",
    "The fact that you're my favorite person to do absolutely nothing with.",
    "Your kindness, even on days when the world hasn't been kind to you.",
    "How you make ordinary days feel like they matter.",
    "Your courage — you're braver than you give yourself credit for.",
    "How you make me want to be a better version of myself, just by being you.",
    "The way you listen, really listen, when someone needs it.",
    "Your sense of humor, which somehow gets funnier the longer I know you.",
    "The way I can be completely myself around you, without fear of judgment.",
    "The way you make me feel like the most important person in the world, even when we're just sitting in silence.",
    "The way I smile when I think about you, even on the hardest days.",
    "The way your face lights up when you talk about something you love.",
    "How patient you are with me, always.",
    "Every single memory we've made together, and every one still waiting for us.",
    "Simply put: because you are you, and that has always been more than enough.",
  ];

  const textEl = document.getElementById('reasonText');
  const indexEl = document.getElementById('reasonIndex');
  const cardEl = document.getElementById('reasonCard');
  const btn = document.getElementById('nextReason');

  let order = shuffle([...Array(reasons.length).keys()]);
  let pointer = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function showReason(count) {
    const i = order[pointer];
    textEl.textContent = reasons[i];
    indexEl.textContent = `Reason #${count}`;
  }

  showReason(1);

  let count = 1;
  btn.addEventListener('click', () => {
    cardEl.classList.add('swap');
    setTimeout(() => {
      pointer++;
      count++;
      if (pointer >= order.length) {
        order = shuffle([...Array(reasons.length).keys()]);
        pointer = 0;
      }
      showReason(count);
      cardEl.classList.remove('swap');
    }, 220);
  });
})();

// ---------- Envelope ----------
(function initEnvelope() {
  const envelope = document.getElementById('envelope');
  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
  });
})();

// ---------- Love meter (always breaks the scale) ----------
(function initLoveMeter() {
  const slider = document.getElementById('meterSlider');
  const fill = document.getElementById('meterFill');
  const readout = document.getElementById('meterReadout');
  if (!slider) return;

  let maxedOut = false;

  function render(value) {
    if (value >= 97 && !maxedOut) {
      maxedOut = true;
    }
    if (maxedOut) {
      fill.style.width = '100%';
      readout.textContent = '∞ (there is no maximum)';
      readout.classList.add('infinite');
    } else {
      fill.style.width = value + '%';
      readout.textContent = value + '%... and counting';
      readout.classList.remove('infinite');
    }
  }

  slider.addEventListener('input', () => render(Number(slider.value)));
  render(Number(slider.value));
})();

// ---------- Tap-anywhere heart burst ----------
(function initHeartBurst() {
  const symbols = ['❤', '💕', '✨'];

  document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, input, .envelope')) return;

    for (let i = 0; i < 4; i++) {
      const heart = document.createElement('span');
      heart.className = 'burst-heart';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = e.clientX + 'px';
      heart.style.top = e.clientY + 'px';
      heart.style.setProperty('--bx', (Math.random() * 80 - 40) + 'px');
      heart.style.fontSize = (0.9 + Math.random() * 0.8) + 'rem';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  });
})();
