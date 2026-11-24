/* Genera le card dei membri a partire da NextLevel.members (vedi js/data/members.js) */
window.NextLevel.ready(function (NL) {
  const grid = document.getElementById('members-list');

  const initials = name => name.split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const linkedinIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';

  grid.innerHTML = NL.members.map(m => `
    <article class="card member reveal">
      <div class="member-avatar" aria-hidden="true">${initials(m.name)}${m.photo ? `<img src="${NL.url(m.photo)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</div>
      <h3>${m.name}</h3>
      <p class="member-company">${m.company}</p>
      <ul class="member-tags">${m.sectors.map(s => `<li>${s}</li>`).join('')}</ul>
      ${m.linkedin ? `<a class="member-link" href="${m.linkedin}" target="_blank" rel="noopener noreferrer">${linkedinIcon} ${NL.t('linkedin')}<span class="sr-only"> ${NL.t('of')} ${m.name}</span></a>` : ''}
    </article>`).join('');

  NL.observeReveal(grid);
});
