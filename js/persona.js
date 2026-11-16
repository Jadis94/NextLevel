/* "Sono…": adatta testo dell'hero, scheda "Per te" e modulo contatti al profilo scelto */
(function (NL) {
  const lead = document.getElementById('hero-lead');
  const ctaText = document.getElementById('hero-cta-text');
  const chips = [...document.querySelectorAll('.persona-chip')];
  const roleSelect = document.getElementById('contact-role');
  const message = document.getElementById('contact-message');

  const defaults = {
    lead: lead.textContent,
    cta: ctaText.textContent,
    placeholder: message.placeholder
  };

  function selectRole(roleText) {
    [...roleSelect.options].forEach((option, k) => {
      if (option.text === roleText) roleSelect.selectedIndex = k;
    });
  }

  function setPersona(key) {
    const persona = NL.personas[key];
    chips.forEach(chip => chip.setAttribute('aria-pressed', chip.dataset.persona === key));

    lead.classList.add('is-swapping');
    setTimeout(() => {
      lead.textContent = persona ? persona.lead : defaults.lead;
      ctaText.textContent = persona ? persona.cta : defaults.cta;
      lead.classList.remove('is-swapping');
    }, 220);

    if (persona) {
      NL.selectTab(persona.tab);
      selectRole(persona.role);
      message.placeholder = persona.placeholder;
    } else {
      message.placeholder = defaults.placeholder;
    }
  }

  chips.forEach(chip => chip.addEventListener('click', () => {
    setPersona(chip.getAttribute('aria-pressed') === 'true' ? null : chip.dataset.persona);
  }));

  // Anche cliccando una scheda di "Per te" il modulo contatti resta coerente
  document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
    const key = Object.keys(NL.personas).find(k => NL.personas[k].tab === tab.dataset.tab);
    if (key) selectRole(NL.personas[key].role);
  }));
})(window.NextLevel);
