/* Contenuti e impostazioni del sito: qui si modificano testi, eventi e indirizzo email.
   Gli altri file in /js usano questi dati tramite window.NextLevel. */
window.NextLevel = {

  // Indirizzo che riceve i messaggi del modulo contatti
  email: 'desilvestrisluca@gmail.com',

  // Sezioni mostrate dall'indicatore di livello (id della sezione, nome visibile)
  levels: [
    ['home', 'Start'],
    ['chi-siamo', 'Chi siamo e cosa facciamo'],
    ['per-chi', 'Per te'],
    ['come-funziona', 'Il percorso'],
    ['eventi', 'Eventi'],
    ['faq', 'FAQ'],
    ['contatti', 'Unisciti']
  ],

  // Frasi a rotazione nella fascia bordeaux
  phrases: [
    'Le opportunità nascono dagli incontri.',
    "Dove il talento incontra l'esperienza.",
    'Una rete di professionisti al servizio di chi inizia.',
    'Le connessioni che aprono opportunità.'
  ],

  // Membri (pagina membri.html). La foto è facoltativa: se il file manca si vedono le iniziali.
  // Per aggiungere una foto, salva l'immagine in assets/members/ con il nome indicato in "photo".
  members: [
    {
      name: 'Luca De Silvestris',
      company: 'Poste Italiane',
      sectors: ['Insurance', 'Tech'],
      linkedin: 'https://www.linkedin.com/in/lucadesilvestris/',
      photo: 'assets/members/luca-de-silvestris.jpg'
    },
    {
      name: 'Camilla Mazza',
      company: 'Capgemini',
      sectors: ['Defence', 'Tech'],
      linkedin: 'https://www.linkedin.com/in/camilla-mazza-swe/',
      photo: 'assets/members/camilla-mazza.jpg'
    }
  ],

  // Eventi. Ogni evento ha una card nella home e una pagina di dettaglio: evento.html?id=<id>
  //   id            identificativo univoco (usato nell'indirizzo della pagina)
  //   date, tag, title, summary, where   testi mostrati nella card
  //   image         banner (facoltativo), da salvare in assets/eventi/
  //   description   paragrafi della pagina di dettaglio
  //   facts         schede informative: label, value e, facoltativi, url + urlLabel
  events: [
    {
      id: 'aperitivo-introduttivo',
      date: '4 dicembre 2026 · ore 18:30',
      tag: 'Networking',
      title: "Aperitivo introduttivo dell'associazione",
      summary: 'Una serata per conoscersi, fare networking e confrontarsi direttamente sulle idee e sugli obiettivi di Next Level. Evento aperto a tutti.',
      where: 'Triplo Cocktail Bar – Via Chiabrera 84, Roma',
      image: 'assets/eventi/aperitivo-4-dicembre.jpg',
      description: [
        "Next Level inaugura le proprie attività con un aperitivo introduttivo, pensato come momento di incontro, networking e confronto sulle idee e sugli obiettivi dell'associazione. La partecipazione è aperta a tutti.",
        "L'evento si svolge presso il Triplo Cocktail Bar, in una sala interamente riservata: un contesto informale, ideale per conoscersi e scambiare opinioni.",
        "Nel corso della serata saranno disponibili materiali informativi con i principali punti del progetto e le finalità dell'associazione."
      ],
      facts: [
        { label: 'Quando', value: '4 dicembre 2026, dalle ore 18:30' },
        { label: 'Dove', value: 'Triplo Cocktail Bar, Via Chiabrera 84, Roma', url: 'https://triploroma.it/', urlLabel: 'Sito del locale' },
        { label: 'Come arrivare', value: 'A pochi minuti a piedi dalla fermata Metro B San Paolo', url: 'https://www.google.com/maps/search/?api=1&query=Triplo+Cocktail+Bar+Via+Chiabrera+84+Roma', urlLabel: 'Apri su Google Maps' },
        { label: 'Formula', value: 'Aperitivo a 15 € a persona: 1 cocktail e 4 tapas' }
      ]
    }
  ],

  // Personalizzazione del sito in base a "Sono…"
  // tab = scheda di "Per te" da aprire, role = voce da selezionare nel modulo contatti
  personas: {
    stud: {
      lead: 'Speech di professionisti, formazione e occasioni di networking per entrare nel mondo del lavoro con più chiarezza e più contatti.',
      cta: 'Partecipa agli eventi',
      tab: 'giovani',
      role: 'Studente / Laureando / Laureato',
      placeholder: 'Raccontaci cosa studi o di cosa ti occupi e quali temi vorresti approfondire.'
    },
    pro: {
      lead: 'Entra in una rete di professionisti, fai networking con persone di settori diversi e, se vuoi, porta la tua esperienza a chi sta iniziando.',
      cta: 'Entra nella rete',
      tab: 'pro',
      role: 'Professionista',
      placeholder: 'Raccontaci il tuo ruolo, il tuo settore e come vorresti partecipare.'
    },
    ente: {
      lead: 'Portiamo talk, speech e formazione di professionisti nella tua università o azienda, su misura per i tuoi studenti e le tue persone.',
      cta: 'Organizziamo insieme',
      tab: 'enti',
      role: 'Università / Scuola / Azienda',
      placeholder: 'Raccontaci chi siete e che tipo di incontro avete in mente.'
    }
  }
};
