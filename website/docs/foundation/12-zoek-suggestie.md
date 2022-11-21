---
label: Zoeksuggesties
---

Zoeksuggesties zijn aanbevolen resultaten die verschijnen in een dropdown als gebruikers in een zoekveld typen.

![Details logo met extra tekstregel]({{ '/docs/images/Zoekbalk.svg' | path }})

## Hoe te gebruiken

Een goede zoeksuggestie helpt de gebruiker bij het bedenken van een zoekopdracht. Dat kan
een vrije zoekopdracht zijn, zoals bij Google, of zoeken in een 'onzichtbare' lijst met vaste waarden. Denk hierbij aan een adres zoeken in een applicatie met een kaart.

Zoeksuggesties gebruiken heeft de volgende voordelen voor een gebruiker:

- Betere zoekresultaten door gebruik van relevante suggesties.
- De gebruiker kan sneller zoeken.
- Minder typefouten doordat de gebruikers niet zelf hoeven te typen.
- Het kost de gebruiker minder inspanning doordat het systeem een deel van het werk overneemt.

## Geen markupvoorbeeld in de toolkit

De toolkit is een framework-agnostische stijlgids. Om zoeksuggesties op een digitaal toegankelijke manier te bouwen, heeft u een script framework nodig. De toolkit kan dit niet leveren. Wel vindt u in de toolkit eisen aan de vormgeving en eisen voor het functionele gedrag van de zoeksuggesties.

## Vormgeving

In de onderstaande afbeelding staan specificaties voor de suggestion box die bij de zoeksuggesties hoort. In [de Vergunningcheck van het omgevingsloket](https://pre.omgevingswet.overheid.nl/checken/stap/1) is een live voorbeeld is te vinden

![Details logo met extra tekstregel]({{ '/docs/images/Zoekbalk-specs.png' | path }})

## Gedrag en toegankelijkheid

- Geef maximaal 10 suggesties. Zo houden we de lijst compact en zijn er geen scrollbars te zien.
- Breek een zoeksuggestie nooit af. Past een zin niet binnen de breedte van de lijst? Laat de zin dan verdergaan op de volgende regel.
- Maak het mogelijk dat gebruikers met de pijltoetsen door het menu kunnen navigeren en met enter een resultaat kunnen kiezen.
- Geef de zoeksuggestie een duidelijke hover state met een 'hand'-cursor.
- Toon eerdere zoekopdrachten als de gebruiker in het veld focust. Deze stap is optioneel.

### Tekst highlighten

Een zoeksuggestie bestaat uit twee delen: het gedeelte dat de gebruiker typt en het gedeelte dat het systeem aanvult.

Dit verschil moet duidelijk zichtbaar zijn. Zo kan de gebruiker makkelijk zien welk deel het systeem aanvult.

Zorg ervoor dat wat de gebruiker typt, in bold zichtbaar is. Zo kan de gebruiker op meerdere elementen uit de zoeksuggestie zoeken. Dingen die niet in bold staan, zijn aanvullingen vanuit het systeem. Bijvoorbeeld:

- **Rijnstraat 51** , 1234 gt, Amsterdam
- Rijnstraat, **1234 gt**, Amsterdam
- Rijnstraat, 1234 gt, **Amsterdam**

Of zelfs een combinatie van meerdere elementen.

- **Rijnstraat**, 1234gt,s **Amsterdam**

Dit zorgt ervoor dat een gebruiker altijd snel resultaten kan scannen op zijn ingevulde zoekopdracht.

### Screenreader

Zoeksuggesties moeten ook waar te nemen zijn door mensen die een bijvoorbeeld screenreader gebruiken. Zorg ervoor dat de screenreader in ieder geval de volgende informatie aangeeft:

- Geef het label en de placeholder een duidelijke en begrijpelijke tekst, omdat die worden opgelezen. Geef een inputveld een role=combobox mee. Dit helpt de gebruiker bij het herkennen van het inputveld.
- Geef een melding met hoeveel beschikbare resultaten er zijn als een gebruiker stopt met typen. Dat geldt voor als de gebruiker klaar is met typen of als hij halverwege stopt. Geef maximaal 10 beschikbare resultaten. Geef ook een indicatie dat de lijst navigeerbaar is met de pijltoetsen en de enterknop.
- Laat de screenreader een resultaat voorlezen als een gebruiker erboven hovert.
- Sluit af met een bevestiging als een gebruiker een selectie bevestigt. Bijvoorbeeld 'Geselecteerd: ...'

Zie de [de Vergunningcheck op het Omgevingsloket](https://pre.omgevingswet.overheid.nl/checken/stap/1) voor een live voorbeeld.

### Goed meten

Meet het gebruik van zoekvelden en de resultaten goed. Met de inzichten die daaruit komen, kunt u de zoekmachine blijven verbeteren. Zo krijgt de gebruiker een optimale ervaring.
