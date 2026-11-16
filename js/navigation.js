/* Menu mobile, header che si compatta, barra di avanzamento,
   voce di menu attiva e pulsante "torna su" */
(function () {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');

  function setMenuOpen(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  }

  burger.addEventListener('click', () => setMenuOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      setMenuOpen(false);
      burger.focus();
    }
  });

  const header = document.querySelector('header');
  const progressBar = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const menuLinks = [...document.querySelectorAll('#menu a[href^="#"]:not(.btn)')];
  const menuSections = menuLinks.map(a => document.querySelector(a.getAttribute('href')));

  backToTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  function onScroll() {
    const doc = document.documentElement;
    progressBar.style.width = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100) + '%';
    header.classList.toggle('scrolled', doc.scrollTop > 40);
    backToTop.classList.toggle('show', doc.scrollTop > 700);

    let current = -1;
    menuSections.forEach((section, k) => {
      if (section && section.getBoundingClientRect().top < 120) current = k;
    });
    menuLinks.forEach((a, k) => a.classList.toggle('is-active', k === current));
  }

  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
