/* Sceglie la lingua della pagina prima che il resto venga mostrato. Va caricato nell'<head>.
   Ordine di priorità: ?lang=it|en nell'indirizzo, scelta salvata con il selettore IT/EN,
   lingua del browser (italiano se è italiano, altrimenti inglese). */
(function () {
  const NL = window.NextLevel = window.NextLevel || {};
  let lang = 'it';

  try {
    const asked = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('nl-lang');
    if (asked === 'it' || asked === 'en') {
      lang = asked;
      localStorage.setItem('nl-lang', lang);
    } else if (saved === 'it' || saved === 'en') {
      lang = saved;
    } else if (!/^it/i.test(navigator.language || 'it')) {
      lang = 'en';
    }
  } catch (e) { /* localStorage non disponibile: si resta con la lingua del browser */ }

  NL.lang = lang;
  document.documentElement.lang = lang;

  // In inglese la pagina resta nascosta finché i testi non sono pronti, così non si vede l'italiano.
  // Il timeout evita una pagina vuota se i testi non si caricano.
  if (lang !== 'it') {
    document.documentElement.classList.add('i18n-pending');
    setTimeout(() => document.documentElement.classList.remove('i18n-pending'), 4000);
  }
})();
