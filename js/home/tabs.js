/* Schede della sezione "Per te" (navigabili anche da tastiera: frecce, Home, End) */
(function (NL) {
  const tabs = [...document.querySelectorAll('.tab')];
  const panels = document.querySelectorAll('.panel');

  function select(tab, focus) {
    tabs.forEach(t => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active);
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach(p => p.classList.toggle('is-active', p.id === 'tab-' + tab.dataset.tab));
    if (focus) tab.focus();
  }

  // Usato da home/persona.js per aprire la scheda giusta
  NL.selectTab = name => {
    const tab = tabs.find(t => t.dataset.tab === name);
    if (tab) select(tab);
  };

  tabs.forEach((tab, k) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      const n = tabs.length;
      let target = null;
      if (e.key === 'ArrowRight') target = (k + 1) % n;
      else if (e.key === 'ArrowLeft') target = (k - 1 + n) % n;
      else if (e.key === 'Home') target = 0;
      else if (e.key === 'End') target = n - 1;
      if (target !== null) {
        e.preventDefault();
        select(tabs[target], true);
      }
    });
  });
})(window.NextLevel);
