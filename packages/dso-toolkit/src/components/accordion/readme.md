# `.dso-accordion`

Varianten:

- `.dso-accordion.dso-accordion-compact`
- `.dso-accordion.dso-accordion-conclusion`

## Instructies voor afnemers

Een accordion (`.dso-accordion`) bestaat uit secties (`.dso-accordion-section`). Een sectie heeft een handle (`.dso-section-handle`) en body (`.dso-section-body`).

Een accordion section in de state "open" moet een `.dso-open` class op `.dso-accordion-section` krijgen. Dit zorgt voor het "chevron-up"-icoon. Ook als het `.dso-accordion-section` element niet in het DOM staat, moet een open accordion altijd `.dso-open` krijgen.

Er zijn 4 modifiers: `.dso-succes`, `.dso-warning`, `.dso-info` en `.dso-danger` die op de `.dso-accordion-section` kunnen.

Het is mogelijk om een accordion in een accordion te plaatsen. Er moet dan wel `.dso-nested-accordion` op de `.dso-accordion-section` worden gezet.

Voegt u via een modifier een statusicoon toe aan de uitklapbare knop (`.dso-succes`, `.dso-warning`, `.dso-info` of `.dso-danger`)? Let dan op de volgende dingen:

- Beschrijf de betekenis van het statusicoon in de context van de accordion met een .sr-only span. Plaats deze in de tekst van de knop.
- Voorbeeldtekst voor `.dso-succes`: "Informatie bouwwerkzaamheden `<span class="sr-only">(afgerond)</span>`"

## Gedrag en toegankelijkheid

Let bij implementatie van het accordion op het volgende:

- Gebruik voor de uitklapbare knoppen `<button>` als de locatie van de gebruiker ongewijzigd blijft. Als er genavigeerd wordt, gebruik dan een `<a>`.
- Geef deze knoppen een heading op het juiste niveau.
  - Meestal is dat 1 niveau onder het niveau van de heading die boven het accordion staat. Stel dat het accordion direct onder de paginatitel staat (dat is een `<h1>`). Dan krijgt de knop `<h2>`.
  - In een genest accordion heeft de geneste knop een heading van 1 niveau onder de heading van de bovenliggende knop. Stel dat de bovenliggende knop een `<h2>` heeft. Dan krijgt de geneste knop een `<h3>`.
- Geef de knoppen het aria-expanded attribuut. Screenreaders hebben dit attribuut nodig om te bepalen of een knop is ingeklapt of uitgeklapt.
- Zorg daarnaast dat scripting de modifier `.dso-open` meegeeft (zie HTML) aan het bovenliggende element van een uitgeklapte knop. De scripting moet de modifier weer weghalen bij het inklappen. Daarmee zorg je dat het verschil tussen een ingeklapte knop en een uitgeklapte knop goed zichtbaar is.
- Zorg dat de scripting het attribuut `aria-expanded="true"` zet bij het uitklappen en op `"false"` bij het inklappen.
