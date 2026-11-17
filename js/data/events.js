/* Eventi. Ogni evento ha una card nella home e una pagina di dettaglio: evento.html?id=<id>
     id            identificativo univoco (usato nell'indirizzo della pagina)
     date, tag, title, summary, where   testi mostrati nella card
     image         banner (facoltativo), da salvare in assets/eventi/
     description   paragrafi della pagina di dettaglio
     facts         schede informative: label, value e, facoltativi, url + urlLabel */
window.NextLevel.events = [
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
];
