/* Effetti dell'hero e dei pulsanti/card:
   titolo parola per parola, bagliore + parallax, tilt delle card, pulsanti magnetici */
window.NextLevel.ready(function () {
  const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;

  // Titolo: ogni parola diventa <span class="word"><span style="--i:n">…</span></span>
  (function splitWords() {
    const h1 = document.querySelector('.hero h1');
    let index = 0;
    (function walk(el) {
      [...el.childNodes].forEach(node => {
        if (node.nodeType === 3) {
          const fragment = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              fragment.appendChild(document.createTextNode(' '));
              return;
            }
            const word = document.createElement('span');
            word.className = 'word';
            const inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--i', index++);
            word.appendChild(inner);
            fragment.appendChild(word);
          });
          node.replaceWith(fragment);
        } else if (node.nodeType === 1) {
          walk(node);
        }
      });
    })(h1);
  })();

  if (!finePointer || reducedMotion) return;

  // Bagliore che segue il mouse + parallax della scala
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    hero.style.setProperty('--mx', x + 'px');
    hero.style.setProperty('--my', y + 'px');
    const dx = x / r.width - .5;
    const dy = y / r.height - .5;
    art.style.transform = 'perspective(900px) rotateY(' + (dx * 10) + 'deg) rotateX(' + (-dy * 10) + 'deg) translate3d(' + (dx * 12) + 'px,' + (dy * 12) + 'px,0)';
  });
  hero.addEventListener('pointerleave', () => { art.style.transform = ''; });
  art.addEventListener('animationend', e => {
    if (e.target === art) {
      art.style.animation = 'none';
      art.style.opacity = 1;
    }
  });

  // Card: bagliore + inclinazione
  document.querySelectorAll('.cards .card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--px', x + 'px');
      card.style.setProperty('--py', y + 'px');
      card.style.transform = 'perspective(800px) rotateX(' + ((.5 - y / r.height) * 5) + 'deg) rotateY(' + ((x / r.width - .5) * 5) + 'deg) translateY(-6px)';
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  // Pulsanti magnetici
  document.querySelectorAll('.hero .btn,.cta-band .btn,.btn-dark').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .18) + 'px,' + ((e.clientY - r.top - r.height / 2) * .28) + 'px)';
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
});
