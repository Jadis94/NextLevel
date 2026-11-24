/* "Sono…": adatta testo dell'hero e scheda "Per te" al profilo scelto; il pulsante porta alla pagina contatti con il profilo già indicato */
window.NextLevel.ready(function (NL) {
  const lead = document.getElementById('hero-lead');
  const ctaText = document.getElementById('hero-cta-text');
  const chips = [...document.querySelectorAll('.persona-chip')];
  const ctaLink = ctaText.closest('a');

  const defaults = {
    lead: lead.textContent,
    cta: ctaText.textContent,
    href: ctaLink.getAttribute('href')
  };

  function setPersona(key) {
    const persona = NL.personas[key];
    chips.forEach(chip => chip.setAttribute('aria-pressed', chip.dataset.persona === key));

    lead.classList.add('is-swapping');
    setTimeout(() => {
      lead.textContent = persona ? persona.lead : defaults.lead;
      ctaText.textContent = persona ? persona.cta : defaults.cta;
      lead.classList.remove('is-swapping');
    }, 220);

    ctaLink.href = persona ? 'pages/' + NL.pages.contact + '?profilo=' + key : defaults.href;
    if (persona) NL.selectTab(persona.tab);
  }

  chips.forEach(chip => chip.addEventListener('click', () => {
    setPersona(chip.getAttribute('aria-pressed') === 'true' ? null : chip.dataset.persona);
  }));

});
