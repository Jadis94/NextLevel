/* Genera le card dei prossimi eventi a partire da NextLevel.events (vedi js/data/events.js).
   Ogni card è interamente cliccabile e porta alla pagina di dettaglio. */
window.NextLevel.ready(function (NL) {
  const list = document.getElementById('events-list');
  const upcoming = NL.upcomingEvents();

  list.innerHTML = upcoming.map(e => NL.eventCard(e, 'pages/' + NL.pages.event)).join('');
  // senza eventi in programma resta solo la nota sotto la lista
  if (!upcoming.length) list.hidden = true;

  NL.observeReveal(list);
});
