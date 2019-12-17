---
label: Tabellen
---
Gebruik het component ```<table>``` om inhoud logisch te structureren, zodat het gemakkelijker wordt om relaties te zien en te begrijpen. 

Het component ```<table>``` wordt als een data-tabel gebruikt of als data-grid.


## Hoe component "table" gebruiken als data-tabel
- Bij het weergeven van logisch gestructureerde informatie
- Bij het weergeven van “key-value pairs”.
- Wanneer je **wel** headers kan toekennen.
- Wanneer er **geen** interactieve elementen zijn.
- Een data tabel is daarmee een statische weergave van informatie. 
- Opbouw van data tabel is met native HTML ```<table>``` tag
- Gebruik ```<th>``` om koptitels in header te definiëren.

{{frame (path '/components/preview/table-data-table') '.dso-example-wrapper'}}


## Wanneer gebruik je het component "table" niet

### Maak geen layout-tabel
Gebruik een ```<table```> nooit om inhoud op een pagina op te maken. Dit is ook wel bekend als een layout-tabel. Gebruik in plaats daarvan het responsive grid-systeem om inhoud op een pagina op te maken. 

Zie ook: https://www.dso-toolkit.nl/master/docs/layout.html

![Voorbeeld van een layout-tabel]({{path '/docs/images/tables/layout-tabel_voorbeeld.png'}})


### Maak geen definition lists met "table"
- Definition lists worden ook gebruikt om logisch gestructureerde data te tonen. Definition lists worden onder andere gebruikt bij het tonen van meta data.
- Gebruik een definition list als je **geen** koptitel als header boven de kolom kan plaatsen.
- Gebruik een  ```<table>``` als je **wel** een koptitel boven de kolommen kunt plaatsen. De kolom kun je als een groep met een koptitel beschouwen. 

Zie ook: https://www.dso-toolkit.nl/master/components/detail/definition-list.html

{{frame (path '/components/preview/table-definition-list') '.dso-example-wrapper'}}

{{frame (path '/components/preview/table-header') '.dso-example-wrapper'}}


## Hoe component "table" te gebruiken als data-grid
Een data grid is een dynamischere weergave van informatie.
Het bevat wel interactieve elementen.

- Opbouw van data grid is met native HTML ```<table>``` tag én ARIA table ```role="grid"```
- Gebruik ```<th>``` om koptitels in header te definiëren.
- Specifieke keyboard interacties moeten verder worden toegevoegd voor interactieve elementen.
{{frame (path '/components/preview/table-data-grid') '.dso-example-wrapper'}}


## Bootstrap "table" 
Het ```<table>``` component is gebasseerd op Bootstrap’s Table.

Met de volgende uitzonderingen is de markup identiek aan Bootstrap:

Er is geen ```.table-bordered``` variant.
Er is geen ```tr.primary``` en ```tr.secondary```.
Er is geen ```.table-responsive``` functionaliteit.

Zie [Bootstrap Table](https://getbootstrap.com/docs/3.3/css/#tables).


## Gedrag en toegankelijkheid
- Een table heeft altijd een ```<caption>``` nodig. De caption wordt als een titel opgelezen door een screen reader. Indien deze visueel niet wenselijk is wordt deze verborgen met ```.sr-only```.
- Zorg ervoor dat een table één niveau van headers ```<th>``` heeft voor kolommen of rijen.
- Houd de table zo eenvoudig mogelijk. Dit verhoogt de begrijpelijkheid van de table voor eindgebruikers. 
- Zorg ervoor dat er maximaal 1 header niveau is voor de kolommen en maximaal 1 header niveau voor de rijen. Screen readers hebben moeite om goed meerdere header niveaus op te lezen.
- Splits de table in twee losse tables als er 2 header niveaus nodig zijn.


## Bronvermelding
- [WAI ARIA 1.1 Table](https://w3c.github.io/aria-practices/#table)
- [Dienst digitale overheid](https://www.digitoegankelijk.nl)