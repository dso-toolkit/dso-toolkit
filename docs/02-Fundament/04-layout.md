---
label: Lay-out
---
## Horizontale lay-out
Om structuur en consistentie te creëren wordt voor de horizontale verdeling de 12-koloms structuur uit bootstrap gebruikt. Onder het kopje grid staat de toepassing van deze 12-koloms structuur

[![Responsive grid beschrijving]({{ '/docs/layout/layout_1.png' | path }} "Klik voor origineel")]({{ '/docs/layout/layout_1.png' | path }})

## Verticale lay-out
Voor de verticale lay-out en hiërarchie wordt het 8px grid gebruikt. Het 8px grid betekent het volgende: Gebruik increments van 8px om de grootte van en ruimte tussen de elementen te tonen op een pagina. Dus `height`, `width`, `padding`, `margin` bestaan allemaal uit increments van 8.

```
8 > 16 > 24 > 32 > 40 > 48 > 56 > 64 > 72 > 80 [> ...etc]
```

[![8px grid beschrijving]({{ '/docs/layout/layout_2.png' | path }} "Klik voor origineel")]({{ '/docs/layout/layout_2.png' | path }})

Een voorbeeld van een button in het 8px grid:

[![8px grid in een button beschrijving]({{ '/docs/layout/layout_3.png' | path }} "Klik voor origineel")]({{ '/docs/layout/layout_3.png' | path }})

## Softgrid
Deze individuele elementen worden vervolgens relatief gepositioneerd in increments van 8px. Net zoals het verschil tussen `h1`, `h2`, `h3`, `h4` en `h5` waar belangrijke titels groter zijn dan minder belangrijke titels, houd zo ook een groter verschil aan tussen elementen.

## Voordelen
De meest populaire groottes van schermen zijn te delen door 8. Op zijn minst op één axis maar vaak beide. Dit verbetert de scalibility. Door 8px increments te gebruiken haal je 7 tot 8 spacing opties weg, wat het aantal keuzes reduceert en waardoor sneller gecodeerd kan worden.

Consistentie, wanneer deze regels gevolgd worden voor elk element onstaat er automatisch een meer consistente User Interface

[![Pagina opgebouwd met het 8px grid]({{ '/docs/layout/layout_4.png' | path }} "Klik voor origineel")]({{ '/docs/layout/layout_4.png' | path }})

*Een totaal pagina opgebouwd met 8px grid.*