/* Quiz "Qual è il tuo prossimo livello?" (pages/quiz.html).
   Sei domande, due per ciascuna dimensione (carriera, competenze, rete), tre risposte da 0 a 2 punti.
   Domande, risposte e risultati sono in locales/*.po: quiz.q.N.title, quiz.q.N.a.M, quiz.result.L.*, quiz.tip.*.
   Tutto avviene nel browser: le risposte non vengono salvate né inviate. */
window.NextLevel.ready(function (NL) {
  const t = NL.t;
  const fmt = (text, values) => text.replace(/\{(\w+)\}/g, (m, k) => values[k]);

  // dimensione di ciascuna domanda (nell'ordine di quiz.q.0 … quiz.q.5)
  const DIMENSIONS = ['career', 'career', 'skills', 'skills', 'network', 'network'];
  const DIM_LABEL = { career: 'quizDimCareer', skills: 'quizDimSkills', network: 'quizDimNetwork' };
  const MAX_PER_DIMENSION = 4;
  // a parità di punteggio il consiglio riguarda la prima dimensione di questo elenco
  const TIP_ORDER = ['network', 'skills', 'career'];

  const el = id => document.getElementById(id);
  const intro = el('quiz-intro'), question = el('quiz-question'), result = el('quiz-result');
  const card = el('quiz');
  const total = DIMENSIONS.length;
  let answers = [];   // punteggio scelto per ogni domanda (indice = domanda)
  let current = 0;

  const show = panel => [intro, question, result].forEach(p => { p.hidden = p !== panel; });

  function renderQuestion(focus) {
    el('quiz-count').textContent = fmt(t('quizQuestion'), { n: current + 1, total });
    el('quiz-bar').style.width = (current / total * 100) + '%';
    el('quiz-progress').setAttribute('aria-valuenow', current);
    el('quiz-title').textContent = NL.text('quiz.q.' + current + '.title');

    const box = el('quiz-answers');
    box.innerHTML = '';
    for (let score = 0; score < 3; score++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-answer' + (answers[current] === score ? ' is-selected' : '');
      button.setAttribute('aria-pressed', answers[current] === score);
      button.textContent = NL.text('quiz.q.' + current + '.a.' + score);
      button.addEventListener('click', () => choose(score));
      box.appendChild(button);
    }
    const back = el('quiz-back');
    back.textContent = t('quizBack');
    back.style.visibility = current === 0 ? 'hidden' : 'visible';
    if (focus) el('quiz-title').focus({ preventScroll: true });
  }

  function choose(score) {
    answers[current] = score;
    if (current < total - 1) { current++; renderQuestion(true); }
    else showResult();
  }

  function level(sum) { return sum <= 4 ? 1 : sum <= 8 ? 2 : 3; }

  function showResult() {
    const scores = { career: 0, skills: 0, network: 0 };
    answers.forEach((score, i) => { scores[DIMENSIONS[i]] += score; });
    const sum = answers.reduce((a, b) => a + b, 0);
    const lvl = level(sum);
    const title = NL.text('quiz.result.' + lvl + '.title');

    // punto più debole (a parità, vince la dimensione più avanti in TIP_ORDER)
    let weakest = TIP_ORDER[0];
    TIP_ORDER.forEach(d => { if (scores[d] < scores[weakest]) weakest = d; });
    const tip = scores[weakest] === MAX_PER_DIMENSION ? NL.text('quiz.tip.top') : NL.text('quiz.tip.' + weakest);

    const bars = ['career', 'skills', 'network'].map(d => `
      <li>
        <span class="quiz-dim">${t(DIM_LABEL[d])}</span>
        <span class="quiz-track" role="img" aria-label="${fmt(t('quizScoreLabel'), { dim: t(DIM_LABEL[d]), n: scores[d], max: MAX_PER_DIMENSION })}"><span style="width:${scores[d] / MAX_PER_DIMENSION * 100}%"></span></span>
      </li>`).join('');

    // azioni: l'iscrizione all'evento (se ce n'è uno in programma) e il contatto con il profilo già scelto
    const next = NL.upcomingEvents()[0];
    const register = next ? { href: NL.registrationUrl(next), label: t('registerEvent'), external: true } : null;
    const contact = profile => ({ href: NL.pages.contact + '?profilo=' + profile, label: lvl === 3 ? t('quizCtaJoin') : t('quizCtaContact') });
    const actions = lvl === 3
      ? [contact('pro'), register]
      : [register || contact('stud'), register ? contact('stud') : null];
    const links = actions.filter(Boolean).map((a, i) =>
      `<a class="btn ${i === 0 ? 'btn-dark' : 'btn-outline'}" href="${a.href}"${a.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${a.label} <span class="btn-arrow" aria-hidden="true">→</span></a>`).join('');

    result.innerHTML = `
      <p class="quiz-count">${t('quizYourLevel')}</p>
      <h2 class="quiz-result-title" id="quiz-result-title" tabindex="-1">${title}</h2>
      <p class="quiz-result-text">${NL.text('quiz.result.' + lvl + '.text')}</p>
      <ul class="quiz-bars">${bars}</ul>
      <p class="quiz-tip">${tip}</p>
      <div class="quiz-actions">${links}</div>
      <div class="quiz-secondary">
        <button type="button" class="quiz-link" id="quiz-share">${t('quizShare')}</button>
        <button type="button" class="quiz-link" id="quiz-retry">${t('quizRetry')}</button>
      </div>`;
    show(result);
    el('quiz-bar').style.width = '100%';
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el('quiz-result-title').focus({ preventScroll: true });

    el('quiz-retry').addEventListener('click', start);
    el('quiz-share').addEventListener('click', e => {
      const text = fmt(t('quizShareText'), { level: title });
      const url = location.href.split(/[?#]/)[0];
      if (navigator.share) navigator.share({ text, url }).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(text + ' ' + url).then(() => { e.target.textContent = t('quizCopied'); });
    });
  }

  function start() {
    answers = [];
    current = 0;
    show(question);
    renderQuestion(true);
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  el('quiz-start').addEventListener('click', start);
  el('quiz-back').addEventListener('click', () => { if (current > 0) { current--; renderQuestion(true); } });
});
