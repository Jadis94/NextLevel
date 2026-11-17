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
| `index.html` | Home page: presentazione dell'associazione, attività, percorsi per tipologia di utente, eventi e FAQ. |
| `membri.html` | Elenco dei membri dell'associazione. |
| `contatti.html` | Pagina con il modulo per scriverci. |
| `evento.html` | Pagina di dettaglio di un evento, selezionato tramite parametro (`evento.html?id=<id>`). |

Tecnologie impiegate: HTML5, CSS3 e JavaScript (ES6+), senza framework né dipendenze esterne e senza fase di compilazione.

## Requisiti e utilizzo

Non è richiesta alcuna installazione. Per visualizzare il sito in locale è sufficiente aprire `index.html` con un browser moderno.

## Struttura del progetto

```
index.html              Home page
membri.html             Pagina dei membri
contatti.html           Pagina contatti con il modulo
evento.html             Pagina di dettaglio degli eventi
assets/
  logo.png              Logo e favicon
  members/              Fotografie dei membri
  eventi/               Immagini degli eventi
css/
  main.css              Punto di ingresso: importa i fogli di stile nell'ordine corretto
  core/                 Variabili (colori, font), stili di base, pulsanti, animazioni di comparsa, accessibilità
  components/           Header, card, striscia scorrevole, footer, finestra privacy, pulsante "torna su"
  sections/             Stili specifici di ciascuna sezione (hero, about, audience, journey, events, event-detail, faq, contact, members)
js/
  data/                 Contenuti modificabili (ognuno espone i suoi dati su window.NextLevel)
    site.js             Indirizzo email e frasi a rotazione (crea window.NextLevel: va caricato per primo)
    members.js          Elenco dei membri
    events.js           Elenco degli eventi
    personas.js         Profili "Sono…" (testi dell'hero, scheda "Per te", modulo)
  core/                 Script comuni a tutte le pagine
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
| Eventi (card e pagina di dettaglio) | `js/data/events.js` |
| Frasi a rotazione, indirizzo email di destinazione | `js/data/site.js` |
| Testi dei profili "Sono…" | `js/data/personas.js` |
| Testi delle sezioni | `index.html`, `membri.html` |
| Colori e caratteri tipografici | `css/core/tokens.css` |
| Fotografia di un membro | Salvare il file in `assets/members/` con il nome indicato nel campo `photo` del membro in `js/data/members.js` |

Per aggiungere un evento è sufficiente inserire un nuovo elemento nell'elenco di `js/data/events.js`, con un `id` univoco: la card nella home e la pagina `evento.html?id=<id>` vengono generate automaticamente. Il banner dell'evento va salvato in `assets/eventi/`.

Se la fotografia di un membro non è disponibile, la scheda mostra automaticamente le iniziali.

### Modulo di contatto

L'invio del modulo apre il programma di posta predefinito dell'utente con un messaggio già compilato e indirizzato all'indirizzo configurato in `js/data/site.js`. Il sito non dispone di un server né memorizza i dati inseriti.

## Convenzioni di sviluppo

- I file JavaScript sono script classici (non moduli ES) e vengono caricati in ordine al termine di `index.html` e `membri.html`. I file in `js/data/` vanno caricati prima degli altri script, con `site.js` per primo, poiché espongono i dati tramite `window.NextLevel`. Ogni pagina carica solo i file che le servono.
- L'ordine delle importazioni in `css/main.css` è significativo: `core/reveal.css` e `core/accessibility.css` devono rimanere in coda.
- Gli stati dinamici sono espressi con classi con prefisso `is-` (ad esempio `is-active`, `is-visible`).
- Le immagini vanno ottimizzate prima dell'inserimento, in particolare le fotografie dei membri e il logo.

## Pubblicazione

Il sito è statico e viene ospitato su GitHub Pages. La pubblicazione avviene a seguito del push sul ramo principale del repository.

## Protezione dei dati personali

- Il sito non utilizza cookie di profilazione né strumenti di analisi.
- La pubblicazione di nome, azienda, settore, fotografia e profilo LinkedIn nella pagina dei membri è subordinata al consenso esplicito dell'interessato. Ogni membro può richiederne in qualsiasi momento la modifica o la rimozione.
- L'informativa completa, redatta ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 (GDPR), è consultabile dal sito tramite il collegamento "Informativa sulla privacy". Eventuali modifiche ai trattamenti descritti devono essere riportate nell'informativa contenuta in `index.html`.
