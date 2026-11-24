# Next Level

Sito web istituzionale dell'associazione **Next Level**, una rete di professionisti che offre a studenti, laureandi, laureati e neolavoratori occasioni di networking, talk e formazione.

## Indice

1. [Panoramica](#panoramica)
2. [Requisiti e utilizzo](#requisiti-e-utilizzo)
3. [Struttura del progetto](#struttura-del-progetto)
4. [Aggiornamento dei contenuti](#aggiornamento-dei-contenuti)
5. [Convenzioni di sviluppo](#convenzioni-di-sviluppo)
6. [Pubblicazione](#pubblicazione)
7. [Protezione dei dati personali](#protezione-dei-dati-personali)

## Panoramica

Il sito è composto da pagine statiche:

| Pagina | Descrizione |
| --- | --- |
| `index.html` | Home page: presentazione dell'associazione, attività, percorsi per tipologia di utente, eventi e FAQ. |
| `pages/membri.html` | Elenco dei membri dell'associazione. |
| `pages/manifesto.html` | Manifesto dell'associazione: community di manager e ponte con le nuove generazioni. |
| `pages/contatti.html` | Pagina con il modulo per scriverci. |
| `pages/evento.html` | Pagina di dettaglio di un evento, selezionato tramite parametro (`pages/evento.html?id=<id>`). |
| `pages/eventi-passati.html` | Archivio degli eventi conclusi (ogni evento vi passa da solo a fine evento). |
| `404.html` | Pagina mostrata per gli indirizzi inesistenti. Usa percorsi assoluti che partono da `/NextLevel/`: con un dominio proprio vanno cambiati in `/`. |
| `sitemap.xml`, `robots.txt` | Per i motori di ricerca. Aggiungere qui le nuove pagine e i nuovi eventi. |

Il sito è bilingue (italiano e inglese) con **una sola versione di ogni pagina**: i testi stanno nei file `locales/it.po` e `locales/en.po` e la lingua si sceglie con il selettore IT/EN nel menu.

Tecnologie impiegate: HTML5, CSS3 e JavaScript (ES6+), senza framework né dipendenze esterne e senza fase di compilazione.

## Requisiti e utilizzo

Non serve compilare nulla, ma **il sito va aperto da un server, anche locale**: i testi sono letti dai file `.po` e il browser non li legge aprendo `index.html` con un doppio clic (file://). Il modo più semplice è l'estensione "Live Server" di VS Code (tasto destro su `index.html` → "Open with Live Server"). In alternativa, dalla cartella del progetto: `npx serve`.

Per provare l'inglese si può aggiungere `?lang=en` all'indirizzo (`?lang=it` per l'italiano): la scelta viene ricordata dal browser.

## Struttura del progetto

```
index.html              Home page
locales/
  it.po                 Tutti i testi in italiano (pagine, messaggi, frasi, profili, eventi)
  en.po                 Gli stessi testi in inglese (le chiavi devono essere identiche)
tools/
  check-i18n.js         Controllo dei testi: node tools/check-i18n.js
pages/
  membri.html           Pagina dei membri
  manifesto.html        Pagina del manifesto
  contatti.html         Pagina contatti con il modulo
  evento.html           Pagina di dettaglio degli eventi (evento.html?id=<id>)
assets/
  logo.png              Logo e favicon
  volantini/            Volantini scaricabili in PDF (link da manifesto e contatti)
  members/              Fotografie dei membri
  eventi/               Immagini degli eventi
css/
  main.css              Punto di ingresso: importa i fogli di stile nell'ordine corretto
  core/                 Variabili (colori, font), stili di base, pulsanti, animazioni di comparsa, accessibilità
  components/           Header, card, striscia scorrevole, footer, finestra privacy, pulsante "torna su"
  sections/             Stili specifici di ciascuna sezione (hero, about, audience, journey, events, event-detail, faq, contact, members)
js/
  data/                 Contenuti modificabili (ognuno espone i suoi dati su window.NextLevel)
    site.js             Indirizzo email, modulo di iscrizione, nomi delle pagine (completa window.NextLevel)
    members.js          Elenco dei membri
    events.js           Struttura degli eventi (id, date, immagini, link): i testi sono in locales/*.po
    personas.js         Profili "Sono…": scheda e voce del modulo (i testi sono in locales/*.po)
  core/                 Script comuni a tutte le pagine
    lang.js             Sceglie la lingua (va nell'<head>)
    i18n.js             Legge il file .po, riempie la pagina e fornisce NL.ready() e NL.t()
    events-util.js      Eventi futuri/passati, card, file del calendario
    reveal.js           Comparsa degli elementi allo scorrimento
    navigation.js       Menu, header, barra di avanzamento, pulsante "torna su"
    privacy-dialog.js   Finestra con l'informativa sulla privacy (home)
    footer.js           Aggiornamento dell'anno nel footer
  home/                 Script della home page
    quote-rotator.js    Frasi a rotazione
    tabs.js             Schede della sezione "Per te"
    events.js           Generazione delle card degli eventi (cliccabili)
    hero-effects.js     Animazioni dell'hero e degli elementi interattivi
    persona.js          Personalizzazione dei contenuti in base al profilo dell'utente
  pages/                Script delle pagine interne
    members.js          Generazione delle card dei membri (membri.html)
    event-page.js       Pagina di dettaglio di un evento (evento.html)
    contact-form.js     Modulo di contatto (contatti.html)
```

## Aggiornamento dei contenuti

| Intervento | File da modificare |
| --- | --- |
| Membri | `js/data/members.js` |
| Testi di qualsiasi pagina (italiano e inglese) | `locales/it.po` e `locales/en.po` (la chiave è in `data-i18n="…"` nell'HTML) |
| Eventi: date, immagini, link | `js/data/events.js` |
| Eventi: titolo, descrizione, schede | `locales/*.po`, chiavi `event.<id>.…` |
| Frasi a rotazione | `locales/*.po`, chiavi `phrase.N` |
| Indirizzo email di destinazione, modulo di iscrizione | `js/data/site.js` |
| Testi dei profili "Sono…" | `locales/*.po`, chiavi `persona.<profilo>.…` |
| Nuovo testo in una pagina | Aggiungere `data-i18n="chiave"` all'elemento, scrivere il testo italiano nell'HTML (serve se JavaScript non parte) e le due traduzioni nei `.po` |
| Colori e caratteri tipografici | `css/core/tokens.css` |
| Volantini scaricabili | Salvare il PDF in `assets/volantini/` e collegarlo dalla pagina desiderata |
| Fotografia di un membro | Salvare il file in `assets/members/` con il nome indicato nel campo `photo` del membro in `js/data/members.js` |

Per aggiungere un evento è sufficiente inserire un nuovo elemento nell'elenco di `js/data/events.js`, con un `id` univoco: la card nella home e la pagina `pages/evento.html?id=<id>` vengono generate automaticamente. Il banner dell'evento va salvato in `assets/eventi/`.

Se la fotografia di un membro non è disponibile, la scheda mostra automaticamente le iniziali.

### Modulo di contatto

L'invio del modulo apre il programma di posta predefinito dell'utente con un messaggio già compilato e indirizzato all'indirizzo configurato in `js/data/site.js`. Il sito non dispone di un server né memorizza i dati inseriti.

## Convenzioni di sviluppo

- I file JavaScript sono script classici (non moduli ES) e vengono caricati in ordine al termine di ogni pagina; `core/lang.js` va nell'`<head>`. `site.js` e `core/i18n.js` vanno caricati per primi (in quest'ordine), poi i file in `js/data/`. Gli script che usano testi o dati tradotti stanno dentro `NextLevel.ready(NL => { … })`, che parte quando i testi sono pronti.
- L'ordine delle importazioni in `css/main.css` è significativo: `core/reveal.css` e `core/accessibility.css` devono rimanere in coda.
- I percorsi dei file nei dati (`js/data/*.js`, ad esempio `assets/members/foto.jpg`) si scrivono a partire dalla radice del sito; nel codice vanno passati da `NextLevel.url(...)`, che li risolve sia dalla home sia dalle pagine in `pages/`. Le pagine in `pages/` puntano a CSS, JS e immagini con `../`.
- Gli stati dinamici sono espressi con classi con prefisso `is-` (ad esempio `is-active`, `is-visible`).
- Le immagini vanno ottimizzate prima dell'inserimento, in particolare le fotografie dei membri e il logo.

## Pubblicazione

Il sito è statico e viene ospitato su GitHub Pages. La pubblicazione avviene a seguito del push sul ramo principale del repository.

## Protezione dei dati personali

- Il sito non utilizza cookie di profilazione né strumenti di analisi.
- La pubblicazione di nome, azienda, settore, fotografia e profilo LinkedIn nella pagina dei membri è subordinata al consenso esplicito dell'interessato. Ogni membro può richiederne in qualsiasi momento la modifica o la rimozione.
- L'informativa completa, redatta ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 (GDPR), è consultabile dal sito tramite il collegamento "Informativa sulla privacy". Eventuali modifiche ai trattamenti descritti devono essere riportate nell'informativa contenuta in `index.html`.

## Eventi, iscrizioni e lingue

- **Iscrizione**: il pulsante "Iscriviti" apre il modulo Google indicato in `registerUrl` (`js/data/site.js`); un evento può avere un modulo proprio con il campo `register`. Nella pagina dell'evento c'è anche "Aggiungi al calendario" (file .ics generato nel browser).
- **Conto alla rovescia**: usa il primo evento futuro di `js/data/events.js` (campo `start`, con fuso orario). Senza eventi futuri la fascia sparisce.
- **Eventi passati**: finito l'evento (`end`, o 2 ore dopo `start`) passa da solo in `pages/eventi-passati.html`. Per arricchirlo si aggiungono `recap`, `gallery` e `slides`.
- **Lingue**: ogni testo ha una chiave. Nell'HTML è `data-i18n="chiave"` (per gli attributi `data-i18n-aria-label`, `-placeholder`, `-content`); il testo scritto dentro l'elemento è solo quello di partenza, vince il file `.po`. Nei file JavaScript, `NL.t("nome")` legge la chiave `js.nome`. Il formato `.po` è modificabile con un editor di testo o con Poedit; in `msgstr` si può usare HTML semplice (`<em>`, `<strong>`, `<a>`, `<span>`). Dopo ogni modifica si lancia `node tools/check-i18n.js`, che segnala chiavi mancanti in una delle due lingue o inesistenti. Per cambiare lingua si usa il selettore nel menu; la scelta (o la lingua del browser) è ricordata. Il messaggio email del modulo contatti resta in italiano.
- **Limite**: esiste un solo indirizzo per pagina, quindi i motori di ricerca vedono soprattutto la versione italiana.
