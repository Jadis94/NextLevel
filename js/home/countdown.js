/* Conto alla rovescia verso il prossimo evento (il primo in programma in js/data/events.js).
   Se non ci sono eventi futuri la fascia resta nascosta. */
window.NextLevel.ready(function (NL) {
  const band = document.getElementById('countdown');
  const next = NL.upcomingEvents()[0];
  if (!band || !next) return;

  const start = new Date(next.start);
  const title = document.getElementById('countdown-title');
  const links = {
    details: document.getElementById('countdown-details'),
    register: document.getElementById('countdown-register')
  };
  const cells = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds')
  };

  title.textContent = next.title;
  links.details.href = 'pages/' + NL.pages.event + '?id=' + encodeURIComponent(next.id);
  links.register.href = NL.registrationUrl(next);
  band.hidden = false;

  const pad = n => String(n).padStart(2, '0');

  function tick() {
    const left = Math.max(0, start - new Date());
    const s = Math.floor(left / 1000);
    cells.days.textContent = Math.floor(s / 86400);
    cells.hours.textContent = pad(Math.floor(s % 86400 / 3600));
    cells.minutes.textContent = pad(Math.floor(s % 3600 / 60));
    cells.seconds.textContent = pad(s % 60);
    if (left === 0) {
      clearInterval(timer);
      band.classList.add('is-live');
      title.textContent = next.title + ' · ' + NL.t('cdLive');
    }
  }

  const timer = setInterval(tick, 1000);
  tick();
});
