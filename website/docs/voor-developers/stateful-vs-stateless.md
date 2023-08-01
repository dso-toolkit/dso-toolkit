# Stateful vs. stateless

Toen wij net met Web Components begonnen wilden wij afnemers zoveel mogelijk ontlasten. Dat gebeurde voor een groot deel al vanwege het kleinere koppelvlak, de styling die automatisch wordt ingeladen en het afgeschermde (Shadow) DOM.

Maar we zijn ook begonnen met het bouwen van stateful components. Denk aan open/dicht van uitklappers of de positie van panelen. Het is niet veel, maar we kregen al vrij snel verzoeken van afnemers die het werken met deze stateful componenten niet makkelijker maakten.

De aanleiding is altijd dat afnemers invloed op de state van het Web Component willen uitoefenen. Bijvoorbeeld de state in de URL verwerken of een component laten reageren op een trigger buiten dat component.

## Instance methods

Een Web Component kan instance methods definieren. In plain JS ziet dat er voor de afnemer zo uit:

```js
const viewerGrid = document.querySelector("dso-viewer-grid");
viewerGrid.setSize("small");
```

Maar in declaratieve frameworks zoals Angular (en ook React) moet hier eerst een element ref voor worden gemaakt. Vervolgens moet in de juiste lifecycle hook de applicatiestate worden uitgelezen en doorgegeven aan het component.

Voor wijzigingen aan de state vanuit het component moet er een event listener worden toegevoegd die de applicatiestate weer bijwerkt.

## Attributen en/of properties

De meest voor de hand liggende oplossing is het publiceren van de state op het element:

```html
<dso-viewer-grid size="small|medium|large"></dso-viewer-grid>
```

Inherent aan interne state is dat natuurlijk ook het component de state kan wijzigen. Het component zal een seintje moeten geven als de state wordt gewijzigd. Maar waar ligt nu de waarheid? Is dat bij de afnemer die in zijn store bijhoudt `size: small` of in het Web Component `[size="small"]`.

Ook hier moet voor wijzigingen aan de state vanuit het component een event listener voor de applicatiestate worden toegevoegd.

## Nadelen van dual state

In feite worden de componentstate en applicatiestate aan elkaar gesynchroniseerd. Ongeacht wie de waarheid heeft, bij het wijzigen zijn ze niet gelijk.

Omdat er geen bron van waarheid is er geen sprake van "one-way data flow". Dit maakt het gedrag van de applicatie en het component minder transparant of zelfs onvoorspelbaar.

## Stateless

Een stateless component krijgt data en emit events. Dit sluit naadloos aan op "one-way data flow".

Het koppelvlak neemt een klein beetje toe. Er zijn meer properties en meer event listeners. Wij denken dat het kleine beetje extra werk voor afnemers niet in verhouding staat tot de alternatieve oplossingen.
