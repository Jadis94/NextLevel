/* Informativa privacy in finestra modale */
(function () {
  const dialog = document.getElementById('privacy');

  document.querySelectorAll('[data-privacy]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      dialog.showModal();
    });
  });

  // permette di aprire l'informativa da altre pagine con index.html#privacy
  if (location.hash === '#privacy') dialog.showModal();

  dialog.querySelector('.privacy-close').addEventListener('click', () => dialog.close());
  // clic sullo sfondo scuro = chiudi
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
})();
