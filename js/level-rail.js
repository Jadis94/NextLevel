/* Ogni sezione è un "livello": badge nell'eyebrow + indicatore laterale che avanza con lo scroll */
(function (NL) {
  const levels = NL.levels;
  const label = k => k === 0 ? 'NEW GAME' : k === levels.length - 1 ? 'FINAL BOSS' : 'LV ' + String(k + 1).padStart(2, '0');
  const sections = levels.map(([id]) => document.getElementById(id));

  sections.forEach((section, k) => {
    const eyebrow = section && section.querySelector('.eyebrow');
    if (!eyebrow) return;
    const badge = document.createElement('b');
    badge.className = 'level-badge';
    badge.textContent = label(k);
    badge.setAttribute('aria-hidden', 'true');
    eyebrow.prepend(badge, ' ');
  });

  const num = document.getElementById('level-num');
  const name = document.getElementById('level-name');
  const fill = document.getElementById('level-fill');
  let current = -1;

  function update() {
    let c = 0;
    sections.forEach((section, k) => {
      if (section && section.getBoundingClientRect().top < innerHeight * .45) c = k;
    });
    if (c !== current) {
      current = c;
      num.textContent = label(c);
      num.classList.toggle('is-boss', c === levels.length - 1);
      num.classList.toggle('is-start', c === 0);
      name.textContent = levels[c][1];
      num.classList.add('is-bump');
      setTimeout(() => num.classList.remove('is-bump'), 350);
    }
    fill.style.height = ((c + 1) / levels.length * 100) + '%';
  }

  addEventListener('scroll', update, { passive: true });
  update();
})(window.NextLevel);
