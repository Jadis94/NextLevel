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

Il sito è composto da tre pagine statiche:

| Pagina | Descrizione |
| --- | --- |
| `index.html` | Home page: presentazione dell'associazione, attività, percorsi per tipologia di utente, eventi, FAQ e modulo di contatto. |
| `membri.html` | Elenco dei membri dell'associazione. |
| `evento.html` | Pagina di dettaglio di un evento, selezionato tramite parametro (`evento.html?id=<id>`). |

Tecnologie impiegate: HTML5, CSS3 e JavaScript (ES6+), senza framework né dipendenze esterne e senza fase di compilazione.

## Requisiti e utilizzo

Non è richiesta alcuna installazione. Per visualizzare il sito in locale è sufficiente aprire `index.html` con un browser moderno.

## Struttura del progetto

```
index.html              Home page
membri.html             Pagina dei membri
evento.html             Pagina di dettaglio degli eventi
assets/
  logo.png              Logo e favicon
  members/              Fotografie dei membri
  eventi/               Immagini degli eventi
css/
  main.css              Punto di ingresso: importa i fogli di stile nell'ordine corretto
  core/                 Variabili (colori, font), stili di base, pulsanti, animazioni di comparsa, accessibilità
  components/           Header, indicatore di livello, card, striscia scorrevole, footer, finestra privacy, pulsante "torna su"
  sections/             Stili specifici di ciascuna sezione (hero, about, audience, journey, events, event-detail, faq, contact, members)
js/
  config.js             Dati configurabili: email, membri, eventi, frasi, livelli, profili
  reveal.js             Comparsa degli elementi allo scorrimento
  navigation.js         Menu, header, barra di avanzamento, pulsante "torna su"
  quote-rotator.js      Frasi a rotazione
  tabs.js               Schede della sezione "Per te"
  events.js             Generazione delle card degli eventi (cliccabili)
  members.js            Generazione delle card dei membri
  event-page.js         Rendering della pagina di dettaglio di un evento
  hero-effects.js       Animazioni dell'hero e degli elementi interattivi
  level-rail.js         Indicatore di livello laterale
  persona.js            Personalizzazione dei contenuti in base al profilo dell'utente
  contact-form.js       Modulo di contatto
  privacy-dialog.js     Finestra con l'informativa sulla privacy
  footer.js             Aggiornamento dell'anno nel footer
```

## Aggiornamento dei contenuti

| Intervento | File da modificare |
| --- | --- |
| Membri, eventi (card e pagina di dettaglio), frasi a rotazione, indirizzo email di destinazione | `js/config.js` |
| Testi delle sezioni | `index.html`, `membri.html` |
| Colori e caratteri tipografici | `css/core/tokens.css` |
| Fotografia di un membro | Salvare il file in `assets/members/` con il nome indicato nel campo `photo` del membro in `js/config.js` |

Per aggiungere un evento è sufficiente inserire un nuovo elemento nell'elenco `events` di `js/config.js`, con un `id` univoco: la card nella home e la pagina `evento.html?id=<id>` vengono generate automaticamente. Il banner dell'evento va salvato in `assets/eventi/`.

Se la fotografia di un membro non è disponibile, la scheda mostra automaticamente le iniziali.

### Modulo di contatto

L'invio del modulo apre il programma di posta predefinito dell'utente con un messaggio già compilato e indirizzato all'indirizzo configurato in `js/config.js`. Il sito non dispone di un server né memorizza i dati inseriti.

## Convenzioni di sviluppo

- I file JavaScript sono script classici (non moduli ES) e vengono caricati in ordine al termine di `index.html` e `membri.html`. Il file `config.js` deve essere sempre caricato per primo, poiché espone i dati agli altri script tramite `window.NextLevel`.
- L'ordine delle importazioni in `css/main.css` è significativo: `core/reveal.css` e `core/accessibility.css` devono rimanere in coda.
- Gli stati dinamici sono espressi con classi con prefisso `is-` (ad esempio `is-active`, `is-visible`).
- Le immagini vanno ottimizzate prima dell'inserimento, in particolare le fotografie dei membri e il logo.

## Pubblicazione

Il sito è statico e viene ospitato su GitHub Pages. La pubblicazione avviene a seguito del push sul ramo principale del repository.

## Protezione dei dati personali

- Il sito non utilizza cookie di profilazione né strumenti di analisi.
- La pubblicazione di nome, azienda, settore, fotografia e profilo LinkedIn nella pagina dei membri è subordinata al consenso esplicito dell'interessato. Ogni membro può richiederne in qualsiasi momento la modifica o la rimozione.
- L'informativa completa, redatta ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 (GDPR), è consultabile dal sito tramite il collegamento "Informativa sulla privacy". Eventuali modifiche ai trattamenti descritti devono essere riportate nell'informativa contenuta in `index.html`.
