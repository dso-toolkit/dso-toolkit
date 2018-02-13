## Horizontale layout
Om structuur en consistentie te creëren wordt voor de horizontale verdeling de 12 columns structuur uit bootstrap gebruikt. Onder het kopje grid staat de toepassing van deze 12-columns structuur

[![Responsive grid beschrijving]({{ path '/docs/layout/layout_1.png' }} "Klik voor origineel")]({{ path '/docs/layout/layout_1.png' }})

## Verticale layout
Voor de verticale layout en hiërarchie wordt het 8px grid gebruikt. Het 8px grid betekent het volgende: Gebruik increments van 8px om de grootte van en ruimte tussen de elementen te tonen op een pagina. Dus `height`, `width`, `padding`, `margin` bestaan allemaal uit increments van 8.

```
8 > 16 > 24 > 32 > 40 > 48 > 56 > 64 > 72 > 80 [> ...etc]
```

[![8px grid beschrijving]({{ path '/docs/layout/layout_2.png' }} "Klik voor origineel")]({{ path '/docs/layout/layout_2.png' }})

Een voorbeeld van een button in het 8px grid:

[![8px grid in een button beschrijving]({{ path '/docs/layout/layout_3.png' }} "Klik voor origineel")]({{ path '/docs/layout/layout_3.png' }})

## Softgrid
Deze individuele elementen worden vervolgens relatieve gepositioneerd in increments van 8px tegenover elkaar. Net zoals het verschil tussen `h1`, `h2`, `h3`, `h4` en `h5` waar belangrijke titels groter zijn dan minder belangrijke titels, houd zo ook een groter verschil aan tussen elementen.

## Voordelen
De meest populaire groottes van schermen zijn te delen door 8. Op zijn minst op één axis maar vaak beiden. Wat scalibility verbetert. Door 8px increments te gebruiken haal je 7 tot 8 spacing opties weg, wat het aantal keuzes reduceert en vervolgens sneller gecodeerd kan worden.

Consistentie, wanneer deze regels gevolgd worden voor elk element onstaat er automatisch een meer consistente User Interface


[![Pagina opgebouwd met het 8px grid]({{ path '/docs/layout/layout_4.png' }} "Klik voor origineel")]({{ path '/docs/layout/layout_4.png' }})

*Een totaal pagina opgebouwd met 8px grid.*