/* Archivio degli eventi passati: gli eventi vi passano da soli quando finiscono (vedi js/data/events.js) */
window.NextLevel.ready(function (NL) {
  const list = document.getElementById('past-events-list');
  const past = NL.pastEvents();

  if (past.length) {
    list.innerHTML = past.map(e => NL.eventCard(e, NL.pages.event)).join('');
  } else {
    const next = NL.upcomingEvents()[0];
    list.className = 'past-empty reveal';
    list.innerHTML = `
      <h2>${NL.t('pastEmptyTitle')}</h2>
      <p>${NL.t('pastEmptyText')}</p>
      ${next ? `<a class="btn btn-dark" href="${NL.pages.event}?id=${encodeURIComponent(next.id)}">${NL.t('pastNext')}</a>` : ''}`;
  }
  NL.observeReveal(list);
});
