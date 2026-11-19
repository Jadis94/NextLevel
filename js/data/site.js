/* Impostazioni generali del sito: indirizzo email e frasi a rotazione.
   Questo file crea window.NextLevel: va caricato prima di tutti gli altri script. */
window.NextLevel = {

  // Indirizzo che riceve i messaggi del modulo contatti
  email: 'desilvestrisluca@gmail.com',

  // Frasi a rotazione nella fascia bordeaux
  phrases: [
    'Le opportunità nascono dagli incontri.',
    "Dove il talento incontra l'esperienza.",
    'Una rete di professionisti al servizio di chi inizia.',
    'Le connessioni che aprono opportunità.',
    'Un ponte tra nuove generazioni e mondo professionale.'
  ]
};

// Percorsi dei file (immagini, ecc.): nei dati si scrivono sempre a partire dalla radice del sito
// (es. 'assets/members/foto.jpg'); NL.url() li risolve correttamente sia dalla home sia da pages/.
(function (NL, script) {
  const root = new URL('../../', script.src);
  NL.url = path => new URL(path, root).href;
})(window.NextLevel, document.currentScript);
