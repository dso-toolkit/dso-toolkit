// Kloppende heading niveaus op de buttons van de (nested) accordion
// Aria-expanded en .dso-open bij openen en sluiten
// Gebruik voor de uitklapbare knoppen <button>.
// Geef deze knoppen een heading op het juiste niveau.
// Meestal is dat 1 niveau onder het niveau van de heading die boven het accordion staat. Stel dat het accordion direct onder de paginatitel staat (dat is een <h1>). Dan krijgt de knop <h2>.
// In een genest accordion heeft de geneste knop een heading van 1 niveau onder de heading van de bovenliggende knop. Stel dat de bovenliggende knop een <h2> heeft. Dan krijgt de geneste knop een <h3>.
// Geef de knoppen het aria-expanded attribuut. Screenreaders hebben dit attribuut nodig om te bepalen of een knop is ingeklapt of uitgeklapt.
// Zorg dat je javascript het aria-expanded attribuut op “true” zet bij het uitklappen en op “false” bij het inklappen.
// Zorg daarnaast dat je javascript de modifier .dso-open meegeeft (zie html) aan de bovenliggende div van een uitgeklapte knop. De javascript moet de modifier weer weghalen bij het inklappen. Daarmee zorg je dat het verschil tussen een ingeklapte knop en een uitgeklapte knop goed zichtbaar is.
// Voegt u via een modifier een statusicoon toe aan de uitklapbare knop (.dso-succes, .dso-warning, .dso-info of .dso-danger)? Let dan op de volgende dingen:
// Beschrijf de betekenis van het statusicoon in de context van de accordion met een .sr-only span. Plaats deze in de tekst van de knop.
// Voorbeeldtekst voor .dso-succes: “Informatie bouwwerkzaamheden <span class="sr-only">(afgerond)</span>“

describe('Accordion', () => {
  beforeEach(() => {
    cy.visit('http://localhost:56206/iframe.html?id=accordion')
  });

  it('should have button', () => {

  });
});
