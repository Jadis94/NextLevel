/* Controllo dei testi: node tools/check-i18n.js
   Verifica che it.po e en.po abbiano le stesse chiavi, che ogni chiave usata nell'HTML e in JavaScript esista,
   che non ci siano chiavi inutilizzate e che locales/*.js (riserva per file://) siano aggiornati.
   Esce con errore se trova qualcosa che manca. */
const fs = require('fs');
const path = require('path');

const build = require('./build-locales');
const readPo = file => build.parsePo(fs.readFileSync(file, 'utf8'));
function walk(dir, ext, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'tools', 'assets'].includes(f.name)) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, ext, out); else if (ext.some(e => p.endsWith(e))) out.push(p);
  }
  return out;
}

const it = readPo('locales/it.po'), en = readPo('locales/en.po');
let errors = 0;
const fail = msg => { console.error('ERRORE  ' + msg); errors++; };

for (const k of Object.keys(it)) if (!(k in en)) fail(`manca in en.po: ${k}`);
for (const k of Object.keys(en)) if (!(k in it)) fail(`manca in it.po: ${k}`);
for (const [lang, dict] of [['it', it], ['en', en]]) for (const k of Object.keys(dict)) if (dict[k] === '') console.warn(`AVVISO  testo vuoto in ${lang}.po: ${k}`);

// i file locales/*.js (riserva per file://) devono corrispondere ai .po
for (const lang of build.LANGS) {
  const file = 'locales/' + lang + '.js';
  // gli a capo di Git su Windows (CRLF) non contano
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\r\n').join('\n') : '';
  if (current !== build.render(lang)) fail(file + ' non aggiornato: lancia  node tools/build-locales.js');
}

const used = new Set();
for (const f of walk('.', ['.html'])) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)) {
    used.add(m[1]);
    if (!(m[1] in it)) fail(`${f}: chiave inesistente ${m[1]}`);
  }
}
for (const f of walk('js', ['.js'])) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\bt\('([A-Za-z]+)'\)/g)) {
    used.add('js.' + m[1]);
    if (!(('js.' + m[1]) in it)) fail(`${f}: chiave inesistente js.${m[1]}`);
  }
}
// chiavi usate dal codice in modo dinamico
const dynamic = /^(phrase|persona|event|js.quizDim|quiz.(q|result|tip))[.A-Z]/;
for (const k of Object.keys(it)) if (!used.has(k) && !dynamic.test(k)) console.warn('AVVISO  chiave non usata: ' + k);

console.log(`${Object.keys(it).length} chiavi in it.po, ${Object.keys(en).length} in en.po, ${used.size} usate. ${errors ? errors + ' errori.' : 'Tutto coerente.'}`);
process.exit(errors ? 1 : 0);
