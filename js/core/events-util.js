/* Funzioni condivise sugli eventi: futuri/passati, card, link di iscrizione e file del calendario.
   Richiede site.js, i18n.js ed events.js. */
(function (NL) {
  const startOf = e => new Date(e.start);
  const endOf = e => e.end ? new Date(e.end) : new Date(startOf(e).getTime() + 2 * 3600 * 1000);

  // Un evento resta "in programma" fino alla sua fine
  NL.isPast = e => endOf(e) < new Date();
  NL.upcomingEvents = () => NL.events.filter(e => !NL.isPast(e)).sort((a, b) => startOf(a) - startOf(b));
  NL.pastEvents = () => NL.events.filter(NL.isPast).sort((a, b) => startOf(b) - startOf(a));
  NL.registrationUrl = e => e.register || NL.registerUrl;

  const escapeHtml = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Card di un evento. "page" è il percorso della pagina di dettaglio rispetto alla pagina corrente.
  NL.eventCard = (e, page) => {
    const past = NL.isPast(e);
    return `
    <article class="card event reveal${past ? ' is-past' : ''}">
      ${e.image ? `<img class="event-cover" src="${NL.url(e.image)}" alt="" loading="lazy">` : ''}
      <div class="date">${e.date}<small>${past ? NL.t('endedShort') : e.tag}</small></div>
      <div class="body">
        <h3><a class="event-link" href="${page}?id=${encodeURIComponent(e.id)}">${e.title}</a></h3>
        <p>${e.summary}</p>
        <p class="where">📍 ${e.where}</p>
        <span class="event-more" aria-hidden="true">${NL.t('eventMore')}</span>
        ${past ? '' : `<a class="event-register" href="${NL.registrationUrl(e)}" target="_blank" rel="noopener noreferrer">${NL.t('register')}<span class="sr-only"> – ${escapeHtml(e.title)}</span></a>`}
      </div>
    </article>`;
  };

  // File .ics generato nel browser (nessun server): si apre con Google Calendar, Outlook, Apple Calendar
  const icsDate = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const icsText = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

  NL.downloadIcs = e => {
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Next Level//Eventi//IT', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      `UID:${e.id}@nextlevel`,
      `DTSTAMP:${icsDate(new Date())}`,
      `DTSTART:${icsDate(startOf(e))}`,
      `DTEND:${icsDate(endOf(e))}`,
      `SUMMARY:${icsText(e.title)}`,
      `LOCATION:${icsText(e.where)}`,
      `DESCRIPTION:${icsText(e.summary)}`,
      'END:VEVENT', 'END:VCALENDAR'
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = e.id + '.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
})(window.NextLevel);
