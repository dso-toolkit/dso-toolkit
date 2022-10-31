# `.dso-accordion`

Varianten:

- `.dso-accordion.dso-accordion-compact`
- `.dso-accordion.dso-accordion-conclusion`

Het accordioncomponent is een lijst met uitklapbare titels. Gebruikers kunnen hiermee delen van content in- en uitklappen. Doordat alleen de titels zichtbaar zijn ziet de gebruiker snel wat belangrijk is om te lezen.

## Technische opmerkingen

Een accordion (`.dso-accordion`) bestaat uit secties (`.dso-accordion-section`). Een sectie heeft een handle (`.dso-section-handle`) en body (`.dso-section-body`).

Een accordion section in de state "open" moet een `.dso-open` class op `.dso-accordion-section` krijgen. Dit zorgt voor het "chevron-up"-icoon. Ook als het `.dso-accordion-section` element niet in het DOM staat, moet een open accordion altijd `.dso-open` krijgen.

Er zijn 4 modifiers: `.dso-succes`, `.dso-warning`, `.dso-info` en `.dso-danger` die op de `.dso-accordion-section` kunnen.

Het is mogelijk om een accordion in een accordion te plaatsen. Er moet dan wel `.dso-nested-accordion` op de `.dso-accordion-section` worden gezet.

## Wanneer te gebruiken

Gebruik een accordion bij lange pagina's met veel content om scrollen te verminderen. De titels vormen voor de gebruiker een informatiestructuur die makkelijk te overzien is. Ook wordt een pagina makkelijker leesbaar als je delen van de content kunt verbergen.

In sommige gevallen is een accordion beter dan anchors omdat de informatiestructuur behouden blijft. Accordions zijn ook beter bij mobiele weergave, waar de ruimte op de pagina beperkt is.

## Wanneer niet te gebruiken

Gebruik een accordion niet als alle content zichtbaar moet zijn om vragen van gebruikers te beantwoorden. De relevantie van de content is dan belangrijker dan de totale lengte van de pagina.

## Hoe te gebruiken

Zorg dat de gebruiker meerdere delen tegelijk kan openen. De delen van een accordion hebben twee verschillende posities: ingeklapt en uitgeklapt. De posities zijn af te lezen aan de chevron. Wijst de chevron naar beneden, dan is de accordion ingeklapt. Wijst de chevron naar boven, dan is de accordion uitgeklapt. De accordion kan ook genest gebruikt worden.

## Gedrag en toegankelijkheid

Let bij implementatie van het accordion op het volgende:

- Gebruik voor de uitklapbare knoppen `<button>`.
- Geef deze knoppen een heading op het juiste niveau.
  - Meestal is dat 1 niveau onder het niveau van de heading die boven het accordion staat. Stel dat het accordion direct onder de paginatitel staat (dat is een `<h1>`). Dan krijgt de knop `<h2>`.
  - In een genest accordion heeft de geneste knop een heading van 1 niveau onder de heading van de bovenliggende knop. Stel dat de bovenliggende knop een `<h2>` heeft. Dan krijgt de geneste knop een `<h3>`.
- Geef de knoppen het aria-expanded attribuut. Screenreaders hebben dit attribuut nodig om te bepalen of een knop is ingeklapt of uitgeklapt.
- Zorg dat je javascript het aria-expanded attribuut op "true" zet bij het uitklappen en op "false" bij het inklappen.
- Zorg daarnaast dat je javascript de modifier .dso-open meegeeft (zie html) aan de bovenliggende div van een uitgeklapte knop. De javascript moet de modifier weer weghalen bij het inklappen. Daarmee zorg je dat het verschil tussen een ingeklapte knop en een uitgeklapte knop goed zichtbaar is.
- Voegt u via een modifier een statusicoon toe aan de uitklapbare knop (.dso-succes, .dso-warning, .dso-info of .dso-danger)? Let dan op de volgende dingen:
  - Beschrijf de betekenis van het statusicoon in de context van de accordion met een .sr-only span. Plaats deze in de tekst van de knop.
  - Voorbeeldtekst voor .dso-succes: "Informatie bouwwerkzaamheden `<span class="sr-only">(afgerond)</span>`"

## Bronvermelding

- U.S. Web Design System (USWDS). Components Accordion. Geraadpleegd op 20 maart 2020, van https://designsystem.digital.gov/components/accordion/
- NN/g Nielsen Norman Group. Accordions complex content. Geraadpleegd op 20 maart 2020, van https://www.nngroup.com/articles/accordions-complex-content
- W3C. (2019, 14 augustus). WAI-ARIA Authoring Practices 1.1: 3.1 Accordion (Sections With Show/Hide Functionality)Geraadpleegd op 23 juli 2020, van https://www.w3.org/TR/wai-aria-practices/#accordion
