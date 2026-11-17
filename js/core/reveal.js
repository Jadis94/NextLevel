/* Comparsa degli elementi .reveal quando entrano nello schermo */
(function (NL) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  // Da richiamare anche per gli elementi aggiunti dinamicamente (vedi home/events.js)
  NL.observeReveal = (root = document) => {
    root.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  NL.observeReveal();
})(window.NextLevel);
