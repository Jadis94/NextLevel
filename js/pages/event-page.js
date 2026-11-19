/* Pagina di dettaglio di un evento: evento.html?id=<id> (dati in js/data/events.js) */
(function (NL) {
  const container = document.getElementById('event-detail');
  const id = new URLSearchParams(location.search).get('id');
  const event = NL.events.find(e => e.id === id);

  if (!event) {
    document.title = 'Evento non trovato – Next Level';
    container.innerHTML = `
      <div class="container">
        <h1>Evento non trovato</h1>
        <p>L'evento che cerchi non esiste o non è più disponibile.</p>
        <a class="btn btn-primary" href="../index.html#eventi">Vai agli eventi</a>
      </div>`;
    return;
  }

  document.title = `${event.title} – Next Level`;

  const facts = event.facts.map(f => `
    <div>
      <dt>${f.label}</dt>
      <dd>${f.value}${f.url ? ` <a href="${f.url}" target="_blank" rel="noopener noreferrer">${f.urlLabel || f.url}</a>` : ''}</dd>
    </div>`).join('');

  container.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <a class="back-link" href="../index.html#eventi">← Tutti gli eventi</a>
        <span class="eyebrow">Evento · ${event.tag}</span>
        <h1>${event.title}</h1>
        <p class="event-when">📅 ${event.date}</p>
      </div>
    </section>

    <section class="event-detail">
      <div class="container event-layout">
        <div class="event-main">
          ${event.image ? `<img class="event-banner" src="${NL.url(event.image)}" alt="${event.title}">` : ''}
          <h2>Di cosa si tratta</h2>
          ${event.description.map(p => `<p>${p}</p>`).join('')}
        </div>
        <aside class="event-aside">
          <h2>Informazioni</h2>
          <dl>${facts}</dl>
          <a class="btn btn-primary" href="contatti.html">Scrivici per info <span class="btn-arrow" aria-hidden="true">→</span></a>
        </aside>
      </div>
    </section>`;
})(window.NextLevel);
