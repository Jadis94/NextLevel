/* Pagina di dettaglio di un evento: evento.html?id=<id> (dati in js/data/events.js) */
window.NextLevel.ready(function (NL) {
  const t = NL.t;
  const container = document.getElementById('event-detail');
  const id = new URLSearchParams(location.search).get('id');
  const event = NL.events.find(e => e.id === id);

  if (!event) {
    document.title = t('notFoundTitle') + ' – Next Level';
    container.innerHTML = `
      <div class="container">
        <h1>${t('notFoundTitle')}</h1>
        <p>${t('notFoundText')}</p>
        <a class="btn btn-primary" href="../index.html#eventi">${t('toEvents')}</a>
      </div>`;
    return;
  }

  const past = NL.isPast(event);
  document.title = `${event.title} – Next Level`;

  const facts = event.facts.map(f => `
    <div>
      <dt>${f.label}</dt>
      <dd>${f.value}${f.url ? ` <a href="${f.url}" target="_blank" rel="noopener noreferrer">${f.urlLabel || f.url}</a>` : ''}</dd>
    </div>`).join('');

  const recap = past && event.recap ? `<h2>${t('recap')}</h2>${event.recap.map(p => `<p>${p}</p>`).join('')}` : '';
  const gallery = past && event.gallery && event.gallery.length
    ? `<h2>${t('gallery')}</h2><div class="event-gallery">${event.gallery.map(src => `<img src="${NL.url(src)}" alt="" loading="lazy">`).join('')}</div>` : '';
  const slides = past && event.slides && event.slides.length
    ? `<h2>${t('slides')}</h2><ul class="event-slides">${event.slides.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a></li>`).join('')}</ul>` : '';

  const actions = past
    ? `<p class="event-ended">${t('ended')}</p>`
    : `<a class="btn btn-primary" href="${NL.registrationUrl(event)}" target="_blank" rel="noopener noreferrer">${t('registerEvent')} <span class="btn-arrow" aria-hidden="true">→</span></a>
       <button type="button" class="btn btn-outline" id="event-calendar">${t('addToCalendar')}</button>`;

  container.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <a class="back-link" href="../index.html#eventi">${t('allEvents')}</a>
        <span class="eyebrow">${t('event')} · ${event.tag}</span>
        <h1>${event.title}</h1>
        <p class="event-when">📅 ${event.date}</p>
      </div>
    </section>

    <section class="event-detail">
      <div class="container event-layout">
        <div class="event-main">
          ${event.image ? `<img class="event-banner" src="${NL.url(event.image)}" alt="${event.title}">` : ''}
          <h2>${t('about')}</h2>
          ${event.description.map(p => `<p>${p}</p>`).join('')}
          ${recap}${gallery}${slides}
        </div>
        <aside class="event-aside">
          <h2>${t('info')}</h2>
          <dl>${facts}</dl>
          <div class="event-actions">
            ${actions}
            <a class="btn btn-outline" href="${NL.pages.contact}">${t('askInfo')}</a>
          </div>
        </aside>
      </div>
    </section>`;

  const calendar = document.getElementById('event-calendar');
  if (calendar) calendar.addEventListener('click', () => NL.downloadIcs(event));
});
