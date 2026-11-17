/* Modulo contatti: controlla i campi e apre il programma di posta con un'email già strutturata */
(function (NL) {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const submitBtn = document.getElementById('contact-submit');
  const submitText = document.getElementById('contact-submit-text');
  const reopen = document.getElementById('reopen-mail');
  const count = document.getElementById('message-count');
  const message = document.getElementById('contact-message');
  const roleSelect = document.getElementById('contact-role');
  const SEPARATOR = '━━━━━━━━━━━━━━━━━━━━━━━━━━';

  const value = id => document.getElementById(id).value.trim();

  // Messaggi di errore in italiano, uno per campo
  const checks = {
    'contact-name': el => !el.value.trim() ? 'Scrivi il tuo nome e cognome.' : '',
    'contact-email': el => !el.value.trim() ? "Scrivi la tua email."
      : !el.validity.valid ? "Controlla l'indirizzo: manca qualcosa (es. nome@esempio.it)." : '',
    'contact-phone': el => el.value.trim() && !/^\+?[\d\s().-]{6,}$/.test(el.value.trim()) ? 'Controlla il numero: usa solo cifre, spazi e il prefisso (es. +39 333 1234567).' : '',
    'contact-message': el => !el.value.trim() ? 'Scrivi due righe su di te.'
      : el.value.trim().length < 10 ? 'Aggiungi qualche parola in più (almeno 10 caratteri).' : '',
    'contact-consent': el => !el.checked ? 'Serve il tuo consenso per poterti ricontattare.' : ''
  };

  function validate(id) {
    const el = document.getElementById(id);
    const text = checks[id](el);
    const err = document.getElementById('err-' + id);
    err.textContent = text;
    el.setAttribute('aria-invalid', text ? 'true' : 'false');
    el.closest('.field').classList.toggle('has-error', !!text);
    return !text;
  }

  Object.keys(checks).forEach(id => {
    const el = document.getElementById(id);
    // Dopo il primo errore si ricontrolla mentre scrivi; altrimenti alla fine del campo
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') validate(id); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validate(id); });
    el.addEventListener('change', () => { if (el.getAttribute('aria-invalid') === 'true') validate(id); });
  });

  // Arrivando da "Sono…" o da una scheda di "Per te" (contatti.html?profilo=…) il modulo è già adattato
  const persona = NL.personas[new URLSearchParams(location.search).get('profilo')];
  if (persona) {
    [...roleSelect.options].forEach((option, k) => { if (option.text === persona.role) roleSelect.selectedIndex = k; });
    message.placeholder = persona.placeholder;
  }

  message.addEventListener('input', () => {
    count.textContent = message.value.length + ' / ' + message.maxLength;
  });

  function buildSubject({ name, role }) {
    return `[Next Level] Nuova richiesta di contatto – ${name} (${role})`;
  }

  function buildBody({ name, email, phone, role, org, message }) {
    const sentAt = new Date().toLocaleString('it-IT', { dateStyle: 'long', timeStyle: 'short' });
    return [
      'NUOVA RICHIESTA DI CONTATTO',
      'Ricevuta dal sito Next Level',
      '',
      SEPARATOR,
      'DATI DI CONTATTO',
      SEPARATOR,
      `Nome e cognome:  ${name}`,
      `Email:           ${email}`,
      ...(phone ? [`Telefono:        ${phone}`] : []),
      `Profilo:         ${role}`,
      ...(org ? [`Ente/settore:    ${org}`] : []),
      `Data invio:      ${sentAt}`,
      '',
      SEPARATOR,
      'MESSAGGIO',
      SEPARATOR,
      message,
      '',
      SEPARATOR,
      `Per rispondere scrivi a: ${email}`,
      "Consenso privacy: l'utente ha accettato l'informativa."
    ].join('\r\n');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const results = Object.keys(checks).map(validate);
    if (results.includes(false)) {
      const first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    const data = {
      name: value('contact-name'),
      email: value('contact-email'),
      phone: value('contact-phone'),
      role: value('contact-role'),
      org: value('contact-org'),
      message: value('contact-message')
    };
    const url = `mailto:${NL.email}?subject=${encodeURIComponent(buildSubject(data))}&body=${encodeURIComponent(buildBody(data))}`;
    reopen.href = url;

    submitBtn.disabled = true;
    submitText.textContent = 'Preparo il messaggio…';
    setTimeout(() => {
      location.href = url;
      submitBtn.disabled = false;
      submitText.textContent = 'Invia messaggio';
      success.style.display = 'flex';
      success.focus();
    }, 350);
  });

  // Pulsante "Copia indirizzo email" nel messaggio di conferma
  document.getElementById('copy-email').addEventListener('click', e => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(NL.email).then(() => {
      e.target.textContent = 'Indirizzo copiato ✓';
    });
  });
})(window.NextLevel);
