/* Traduzioni: legge locales/<lingua>.po e riempie la pagina.
   - Nell'HTML ogni testo ha data-i18n="chiave" (e, per gli attributi, data-i18n-aria-label, -placeholder, -content…).
     Il testo scritto nell'HTML è solo quello di partenza: vince quello del file .po.
   - Gli script che hanno bisogno dei testi si registrano con NL.ready(NL => { … }) e partono a testi pronti.
   - NL.t("nome") restituisce il testo della chiave js.nome (messaggi generati da JavaScript).
   Va caricato subito dopo site.js. Richiede un server (anche locale): il browser non legge file da file://. */
(function (NL) {
  let dict = {};

  // Lettura del formato gettext: coppie msgid "chiave" / msgstr "testo", anche su più righe
  const unescape = s => s.replace(/\\(n|t|"|\\)/g, (m, c) => ({ n: '\n', t: '\t', '"': '"', '\\': '\\' }[c]));
  function parsePo(text) {
    const out = {};
    let id = null, str = null, target = null;
    const flush = () => { if (id) out[id] = str; id = str = target = null; };
    text.split(/\r?\n/).forEach(line => {
      let m;
      if ((m = line.match(/^msgid\s+"(.*)"\s*$/))) { flush(); id = unescape(m[1]); target = 'id'; }
      else if ((m = line.match(/^msgstr\s+"(.*)"\s*$/))) { str = unescape(m[1]); target = 'str'; }
      else if ((m = line.match(/^"(.*)"\s*$/))) { if (target === 'id') id += unescape(m[1]); else if (target === 'str') str += unescape(m[1]); }
      else if (!line.trim()) flush();
    });
    flush();
    return out;
  }

  const loaded = new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', NL.url('locales/' + NL.lang + '.po'));
    xhr.overrideMimeType('text/plain; charset=utf-8');
    xhr.onload = () => {
      if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText)) dict = parsePo(xhr.responseText);
      else console.error('Testi non trovati (' + xhr.status + '): locales/' + NL.lang + '.po');
      resolve();
    };
    xhr.onerror = () => { console.error('Impossibile leggere locales/' + NL.lang + '.po: apri il sito da un server (vedi README).'); resolve(); };
    xhr.send();
  });
  const domReady = new Promise(resolve => {
    if (document.readyState !== 'loading') resolve();
    else document.addEventListener('DOMContentLoaded', resolve);
  });

  // Testo di una chiave: dalla lingua corrente, altrimenti la chiave stessa
  NL.text = key => dict[key] !== undefined ? dict[key] : key;
  NL.t = key => NL.text('js.' + key);

  // Elenco di testi numerati: prefisso.0, prefisso.1, …
  const list = prefix => {
    const out = [];
    for (let i = 0; dict[prefix + '.' + i] !== undefined; i++) out.push(dict[prefix + '.' + i]);
    return out;
  };

  function applyToPage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll('*').forEach(el => {
      Array.from(el.attributes).forEach(a => {
        if (!a.name.startsWith('data-i18n-')) return;
        const value = dict[a.value];
        if (value !== undefined) el.setAttribute(a.name.slice('data-i18n-'.length), value);
      });
    });

    // Selettore IT | EN: mostra l'altra lingua, la ricorda e ricarica la pagina
    const other = NL.lang === 'it' ? 'en' : 'it';
    document.querySelectorAll('[data-lang-toggle]').forEach(a => {
      a.hreflang = other;
      a.lang = other;
      a.addEventListener('click', e => {
        e.preventDefault();
        try { localStorage.setItem('nl-lang', other); } catch (err) { /* ignorato */ }
        const url = new URL(location.href);
        url.searchParams.delete('lang');
        location.href = url.href;
      });
    });
  }

  // Dati con testi nel file .po: frasi, profili "Sono…" ed eventi
  function localizeData() {
    NL.phrases = list('phrase');

    Object.keys(NL.personas || {}).forEach(key => {
      ['lead', 'cta', 'placeholder'].forEach(field => { NL.personas[key][field] = dict[`persona.${key}.${field}`]; });
    });

    NL.events = (NL.events || []).map(e => {
      const p = 'event.' + e.id + '.';
      const field = name => dict[p + name] !== undefined ? dict[p + name] : '';
      const recap = list(p + 'recap');
      return {
        ...e,
        date: field('date'), tag: field('tag'), title: field('title'), summary: field('summary'), where: field('where'),
        description: list(p + 'description'),
        recap: recap.length ? recap : undefined,
        facts: e.facts.map((f, i) => ({
          ...f,
          label: field(`fact.${i}.label`), value: field(`fact.${i}.value`),
          urlLabel: dict[`${p}fact.${i}.urlLabel`]
        }))
      };
    });
  }

  const ready = Promise.all([loaded, domReady]).then(() => {
    applyToPage();
    localizeData();
    document.documentElement.classList.remove('i18n-pending');
  });

  NL.ready = fn => ready.then(() => fn(NL));
})(window.NextLevel);
