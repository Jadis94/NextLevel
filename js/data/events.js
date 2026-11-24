/* Eventi: struttura e indirizzi. I TESTI (titolo, data, descrizione, schede) sono in locales/it.po e locales/en.po,
   nelle chiavi event.<id>.… (vedi la sezione "Eventi" dei due file).
   Ogni evento ha una card nella home e una pagina di dettaglio: evento.html?id=<id>
     id          identificativo univoco (usato nell'indirizzo della pagina e nelle chiavi dei testi)
     start       inizio con fuso orario, es. '2026-12-04T18:30:00+01:00' (+01:00 inverno, +02:00 estate).
                 Serve per il conto alla rovescia e per sapere se l'evento è futuro o passato.
     end         fine (facoltativa, usata nel file del calendario; se manca si assumono 2 ore)
     image       banner (facoltativo), da salvare in assets/eventi/
     facts       una voce per ogni scheda informativa, nello stesso ordine dei testi event.<id>.fact.N.…;
                 si indica solo l'indirizzo (url) delle schede che hanno un link
     register    modulo di iscrizione (facoltativo: se manca si usa NextLevel.registerUrl)
   Per un evento passato si possono aggiungere nei .po i paragrafi event.<id>.recap.0, .1, …
   e qui gallery (lista di percorsi in assets/eventi/) e slides (lista di { label, url }). */
window.NextLevel.events = [
  {
    id: 'aperitivo-introduttivo',
    start: '2026-12-04T18:30:00+01:00',
    image: 'assets/eventi/aperitivo-4-dicembre.jpg',
    facts: [
      {},
      { url: 'https://triploroma.it/' },
      { url: 'https://www.google.com/maps/search/?api=1&query=Triplo+Cocktail+Bar+Via+Chiabrera+84+Roma' },
      {}
    ]
  }
];
