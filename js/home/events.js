/* Genera le card degli eventi a partire da NextLevel.events (vedi js/data/events.js).
   Ogni card è interamente cliccabile e porta a evento.html?id=… */
(function (NL) {
  const list = document.getElementById('events-list');

  list.innerHTML = NL.events.map(e => `
    <article class="card event reveal">
      ${e.image ? `<img class="event-cover" src="${e.image}" alt="" loading="lazy">` : ''}
      <div class="date">${e.date}<small>${e.tag}</small></div>
      <div class="body">
        <h3><a class="event-link" href="evento.html?id=${encodeURIComponent(e.id)}">${e.title}</a></h3>
        <p>${e.summary}</p>
        <p class="where">📍 ${e.where}</p>
        <span class="event-more" aria-hidden="true">Scopri i dettagli →</span>
      </div>
    </article>`).join('');

  NL.observeReveal(list);
})(window.NextLevel);
