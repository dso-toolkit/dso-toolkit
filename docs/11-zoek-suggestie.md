---
label: Zoeksuggesties
---
Zoek suggesties zijn aanbevolen resultaten die verschijnen in een dropdown als gebruikers typen in een zoekveld.

![Details logo met extra tekstregel]({{path '/docs/images/Zoekbalk.svg'}})

## Wanneer te gebruiken
Het belangrijkste doel is dat een zoeksuggestie de gebruiker helpt in het samenstellen van zijn of haar zoekopdracht. Dit kan een vrije zoekopdracht zijn zoals Google of zoeken in een "onzichtbare" lijst met vaste waarden. Zoals het zoeken van een adres in een map applicatie.

Deze suggesties verschijnen onder het zoekveld en veranderen bij elke letter die een gebruiker typt.

Voordelen voor een gebruiker als zoeksuggesties gebruikt worden:

- Selectie van een toepasselijke term, wat betere zoekresultaten oplevert
- Sneller, gebruikers hoeven minder te typen
- Type fouten, gebruikers hoeven het geheel niet te typen.
- Minder inspanning, het systeem neemt een deel van de verantwoordelijkheid over.

## Waarom geen markup voorbeeld in de toolkit?
De toolkit is een framework agnostische stijlgids. Om de zoeksuggesties op een digitoegankelijke manier te bouwen is een script framework nodig. Dit kan de toolkit niet leveren.
Wat de toolkit wel kan leveren zijn de eisen aan de vormgeving en het functionele gedrag van de zoeksuggesties.

## Vormgeving
In onderstaande afbeelding staan de specificaties voor de suggestionbox die bij de zoeksuggesties horen.Op [de vergunningcheck van het omgevingsloket](https://pre.omgevingswet.overheid.nl/checken/stap/1) is een live voorbeeld is te vinden

![Details logo met extra tekstregel]({{path '/docs/images/Zoekbalk-specs.png'}})

## Gedrag en Accesbility

- Maximaal 10 suggesties; zo houden we de lijst compact en zijn er geen scrollbars zichtbaar
- Als de zin  niet op de breedte van de lijst past wordt de zin vervolgd op de volgende regel. Een zoeksuggestie wordt niet afgebroken.
- Ondersteuning van toetsenbord navigatie; maak het mogelijk dat gebruikers met de pijltoetsen door het menu kunnen navigeren en met enter een resultaat kunnen selecteren
- Hand cursor; de zoeksuggestie krijgt een duidelijke hover state met een "hand" cursor.
- (Optioneel) Zoekhistorie; Toon de voorgaande zoekopdrachten als de gebruiker in het veld focused.

### Highlighten tekst
Een zoeksuggestie bestaat uit twee delen. Het gedeelte getypt door de gebruikers en het gedeelte dat het systeem aanvult.

(afbeelding om dit begrip aan te duiden)

Dit verschil moet duidelijk getoond worden, zodat de gebruiker makkelijk kan afleiden welke gedeelte door de computer wordt aangevuld.

In de toolkit wordt dit onderscheid als volgt gemaakt. Wat getypt wordt door de gebruiker wordt **bold** getoond.
Argumentatie:
Verschillende onderdelen kunnen in een suggestie gehighlight worden. Een zoeksuggestie bij de locatiekiezer bestaat bijvoorbeeld uit een straatnaam + huisnummer, postcode, plaatsnaam.
Op elk van deze onderdelen kan gezocht worden wat de volgende mogelijkheden tot highlighten geeft.

- **Rijnstraat 51** , 1234 gt, Amsterdam
- Rijnstraat, **1234 gt**, Amsterdam
- Rijnstraat, 1234 gt, **Amsterdam**

Of zelfs een combinatie van meerdere elementen.

- **Rijnstraat**, 1234gt,s **Amsterdam**

Dit zorgt ervoor dat een gebruiker altijd snel resultaten kan scannen op zijn ingevulde zoek opdracht.

### Screenreader
Zoeksuggesties geven een gebruiker extra informatie om het gebruik van de website zo makkelijk mogelijk te maken. Deze extra informatie moet voor iedereen toegankelijk zijn. Dit vereist extra werk aan de kant van de implementator. De volgende informatie moet terug gekoppeld worden via een Screenreader want de informatie die visueel getoond wordt moet ook beschikbaar zijn voor gebruikers van screenreaders. 

Voor een live voorbeeld kijk dan op [de vergunningcheck op het omgevingsloket](https://pre.omgevingswet.overheid.nl/checken/stap/1)

- Label en placeholder worden opgelezen, zorg daarom voor een heldere en begrijpbare tekst. Geef ook een role=combobox op een input veld mee. Dit helpt een gebruiker bij het identificeren van het input veld en de verwachtingen hiervan.
- Wanneer een gebruiker een zoekopdracht begint te typen en hier of mee klaar is of stopt halverwege; geef dan een melding met hoeveel beschikbare resultaten er zijn (altijd max.10 of minder). Geef ook een indicatie dat de lijst navigeerbaar is met de pijltoetsen en de enter knop.
- Wanneer een gebruiker hovered over een selectie lees dan het resultaat voor.
- Wanneer een gebruiker de selectie bevestigd sluit dan af met een bevestiging: u heeft de volgende ...... geselecteerd.

### Blijf analyseren en monitoren
Een effectieve zoekmachine bouwen is niet gemakkelijk. Het is aan de ontwikkelaars en ontwerpers om het gebruik van zoekvelden en de resultaten goed te monitoren. Om vervolgens de zoekmachine verder te ontwikkelen om de gebruiker nog beter te helpen.

## Bronvermelding
- [Nielsen Norman Group](https://www.nngroup.com/)
- [Dienst digitale overheid](https://www.digitoegankelijk.nl)

