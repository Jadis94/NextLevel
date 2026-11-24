/* Impostazioni generali del sito. I testi (frasi, profili, eventi, messaggi) stanno in locales/*.po.
   Questo file completa window.NextLevel (creato da core/lang.js): va caricato prima degli altri script. */
window.NextLevel = Object.assign(window.NextLevel || {}, {

  // Indirizzo che riceve i messaggi del modulo contatti
  email: 'desilvestrisluca@gmail.com',

  // Modulo Google per l'iscrizione agli eventi (usato da tutti gli eventi che non ne indicano uno proprio)
  registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSePkpnngGptAxI-YdWWcTgDwpXscNg18t49pkOrmG0390bKrQ/viewform',

  // Nomi delle pagine a cui rimandano gli script (si trovano tutte nella cartella pages/)
  pages: { contact: 'contatti.html', event: 'evento.html' }
});

// Percorsi dei file (immagini, testi, ecc.): nei dati si scrivono sempre a partire dalla radice del sito
// (es. 'assets/members/foto.jpg'); NL.url() li risolve correttamente da qualsiasi pagina.
(function (NL, script) {
  const root = new URL('../../', script.src);
  NL.url = path => new URL(path, root).href;
})(window.NextLevel, document.currentScript);
