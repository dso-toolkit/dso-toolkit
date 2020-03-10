---
label: Tabellen
---
Gebruik het component `<table>` om inhoud logisch te structureren, zodat het gemakkelijker wordt om relaties te zien en te begrijpen.

Het component `<table>` wordt als een data-tabel gebruikt of als data-grid.


## Hoe component "table" gebruiken als data-tabel
- Bij het weergeven van logisch gestructureerde informatie
- Bij het weergeven van “key-value pairs”.
- Wanneer je **wel** headers kan toekennen.
- Wanneer er **geen** interactieve elementen zijn om de tabel aan te passen.
- Een data tabel is daarmee een statische weergave van informatie.
- Opbouw van data tabel is met native HTML `<table>` tag
- Gebruik `<th scope="col">` voor koptitels in de kolommen.
- Gebruik `<th scope="row">` voor koptitels in de rijen.

{{frame (path '/components/preview/table-data-table') '.dso-example-wrapper'}}


## Wanneer gebruik je het component "table" niet

### Maak geen layout-tabel
Gebruik een `<table>` nooit om inhoud op een pagina op te maken. Dit is ook wel bekend als een layout-tabel. Gebruik in plaats daarvan het responsive grid-systeem om inhoud op een pagina op te maken.

Zie ook: [de layout documentatie]({{ '/docs/layout' | path }})

![Voorbeeld van een layout-tabel]({{ '/docs/images/tables/layout-tabel_voorbeeld.png' | path }})


### Maak geen definition lists met "table"
- Definition lists worden ook gebruikt om logisch gestructureerde data te tonen. Definition lists worden onder andere gebruikt bij het tonen van meta data.
- Gebruik een definition list als je **geen** koptitel als header boven de kolom kan plaatsen.
- Gebruik een  `<table>` als je **wel** een koptitel boven de kolommen kunt plaatsen. De kolom kun je als een groep met een koptitel beschouwen.

Zie ook: [Definition List]({{ '/components/detail/definition-list' | path }})

{{frame (path '/components/preview/table-definition-list') '.dso-example-wrapper'}}

{{frame (path '/components/preview/table-header') '.dso-example-wrapper'}}


## Hoe component "table" te gebruiken als data-grid
Een data grid is een dynamischere weergave van informatie.
Het bevat **wel** interactieve elementen om de tabel aan te passen.

- Opbouw van data grid is met native HTML `<table>` tag én ARIA table `role="grid"`
- Gebruik `<th>` om koptitels in header te definiëren.
- Specifieke keyboard interacties moeten verder worden toegevoegd voor interactieve elementen.

{{frame (path '/components/preview/table-data-grid') '.dso-example-wrapper'}}


### Sorteren in een data-grid
- Bij het gebruik van `role="grid"` wordt vanuit gegaan dat de data in het data-grid aanpasbaar is. Voeg `aria-readonly="true"` toe, als de data niet aanpasbaar is.
- Als je een kolom sorteerbaar wilt maken, voeg dan aan `<th>` `"role=columnheader"` toe.
- - Als je een rij sorteerbaar wilt maken, voeg dan aan `<th>` `"role=rowheader"` toe.
- Wanneer de sortering oplopend is, geef dit bij `<th>` aan met `aria-sort="ascending"`. Bij aflopende resultaten, gebruik `aria-sort="descending"`.
- Als er meerdere sorteerbare kolommen of rijen zijn, dan mag er alleen één sortering tegelijk actief zijn met `aria-sort`.
{{frame (path '/components/preview/table-sortable-readonly') '.dso-example-wrapper'}}


## Bootstrap "table"
Het `<table>` component is gebasseerd op Bootstrap’s Table.

Met de volgende uitzonderingen is de markup identiek aan Bootstrap:

Er is geen `.table-bordered` variant.
Er is geen `tr.primary` en `tr.secondary`.
Er is geen `.table-responsive` functionaliteit.

Zie [Bootstrap Table](https://getbootstrap.com/docs/3.3/css/#tables).


## Gedrag en toegankelijkheid
- Een tabel heeft altijd een `<caption>` nodig. De caption wordt als een titel opgelezen door een screen reader. Indien deze visueel niet wenselijk is wordt deze verborgen met `.sr-only`.
- Houd de tabel zo eenvoudig mogelijk. Dit verhoogt de begrijpelijkheid van de tabel voor eindgebruikers.
- Zorg ervoor dat er maximaal één kop niveau is voor de kolommen en maximaal één kop niveau voor de rijen. Screen readers hebben vaak moeite om goed meerdere kop niveaus op te lezen.
- Gebruik `<th scope="col">` voor koptitels in de kolommen.
- Gebruik `<th scope="row">` voor koptitels in de rijen.
- Splits de table in twee losse tables als er twee kop niveaus nodig zijn.


## Bronvermelding
- [WAI-ARIA 1.1 Table](https://w3c.github.io/aria-practices/#table)
- [WAI-ARIA 1.1 Grid](https://w3c.github.io/aria-practices/#grid)
- [WAI-ARIA 1.1 ARIA-Sort](https://www.w3.org/TR/wai-aria-1.1/#aria-sort)
- [Digitoegankelijk](https://www.digitoegankelijk.nl)
