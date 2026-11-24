/* Frasi a rotazione con puntini di navigazione */
window.NextLevel.ready(function (NL) {
  const quote = document.getElementById('quote-text');
  const dots = document.getElementById('quote-dots');
  let current = 0;
  let timer;

  function show(index) {
    current = index;
    quote.classList.add('is-fading');
    setTimeout(() => {
      quote.textContent = NL.phrases[current];
      quote.classList.remove('is-fading');
    }, 400);
    [...dots.children].forEach((dot, k) => dot.classList.toggle('is-active', k === current));
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show((current + 1) % NL.phrases.length), 5000);
  }

  NL.phrases.forEach((_, n) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', NL.t('quote') + ' ' + (n + 1));
    dot.onclick = () => { show(n); restart(); };
    dots.appendChild(dot);
  });

  dots.children[0].classList.add('is-active');
  restart();
});
