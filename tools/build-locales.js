/* Genera locales/it.js e locales/en.js a partire da locales/it.po e en.po:  node tools/build-locales.js
   Servono per aprire il sito con doppio clic (file://), dove il browser non può leggere i .po:
   js/core/i18n.js li usa come riserva. I .po restano l'unico file da modificare: dopo ogni modifica si rilancia questo comando.
   (tools/check-i18n.js avvisa se i file generati sono rimasti indietro.) */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const LANGS = ['it', 'en'];

const unescape = s => s.replace(/\\(n|t|"|\\)/g, (m, c) => ({ n: '\n', t: '\t', '"': '"', '\\': '\\' }[c]));

// Stessa lettura del formato gettext fatta dal browser (js/core/i18n.js)
function parsePo(text) {
  const out = {};
  let id = null, str = null, target = null;
  const flush = () => { if (id) out[id] = str; id = str = target = null; };
  for (const line of text.split(/\r?\n/)) {
    let m;
    if ((m = line.match(/^msgid\s+"(.*)"\s*$/))) { flush(); id = unescape(m[1]); target = 'id'; }
    else if ((m = line.match(/^msgstr\s+"(.*)"\s*$/))) { str = unescape(m[1]); target = 'str'; }
    else if ((m = line.match(/^"(.*)"\s*$/))) { if (target === 'id') id += unescape(m[1]); else if (target === 'str') str += unescape(m[1]); }
    else if (!line.trim()) flush();
  }
  flush();
  return out;
}

function render(lang) {
  const dict = parsePo(fs.readFileSync(path.join(root, 'locales', lang + '.po'), 'utf8'));
  return `/* GENERATO da tools/build-locales.js a partire da ${lang}.po: non modificare a mano. */\n` +
    `window.NextLevelTexts = window.NextLevelTexts || {};\n` +
    `window.NextLevelTexts.${lang} = ${JSON.stringify(dict, null, 1).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')};\n`;
}

module.exports = { parsePo, render, LANGS, root };

if (require.main === module) {
  for (const lang of LANGS) {
    fs.writeFileSync(path.join(root, 'locales', lang + '.js'), render(lang));
    console.log('scritto locales/' + lang + '.js');
  }
}
