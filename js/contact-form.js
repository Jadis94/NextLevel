/* Modulo contatti: apre il programma di posta con un'email già strutturata */
(function (NL) {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const SEPARATOR = '━━━━━━━━━━━━━━━━━━━━━━━━━━';

  const value = id => document.getElementById(id).value.trim();

  function buildSubject({ name, role }) {
    return `[Next Level] Nuova richiesta di contatto – ${name} (${role})`;
  }

  function buildBody({ name, email, role, message }) {
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
      `Profilo:         ${role}`,
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
    const data = {
      name: value('contact-name'),
      email: value('contact-email'),
      role: value('contact-role'),
      message: value('contact-message')
    };
    location.href = `mailto:${NL.email}?subject=${encodeURIComponent(buildSubject(data))}&body=${encodeURIComponent(buildBody(data))}`;
    success.style.display = 'block';
  });

  // Pulsante "Copia indirizzo email" nel messaggio di conferma
  document.getElementById('copy-email').addEventListener('click', e => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(NL.email).then(() => {
      e.target.textContent = 'Indirizzo copiato ✓';
    });
  });
})(window.NextLevel);
