---
label: Meldingenstrategie
---

Het nummer één principe in Jakob Nielsen's 10 Heuristics of usability is 'The visibility of System Status' (NN/g, 1994). Het is dus belangrijk om de juiste systeemstatus en feedback te geven aan de gebruiker.

We gebruiken meldingen om voorwaarden te communiceren, een gebeurtenis aan te geven of feedback op gebruikersacties weer te geven. Zoals een toelichting, bevestiging, waarschuwing of foutmelding. Ze helpen gebruikers te begrijpen of ze (nog steeds) op weg zijn naar hun doel.

## Basisuitgangspunten

Zorg ervoor dat meldingen relevant, actueel en informatief zijn.

- **Relevant:** Meldingen moeten verband houden met de doelen van de gebruiker en worden getoond in de context van wat ze doen.
- **Actueel:** Zorg ervoor dat gebruikers op de hoogte worden gehouden in hun proces en dat ze essentiële meldingen onmiddellijk zien.
- **Informatief:** Bied gebruikers voldoende context en duidelijke instructies om de melding te begrijpen en op te lossen.

Wees terughoudend met meldingen gebruiken. Overmatig gebruik van meldingen, of meldingen die als storend worden ervaren, zorgen voor een frustrerende en ontmoedigende gebruikerservaring. Bovendien verlagen ze de aandacht van de gebruiker en worden belangrijke meldingen over het hoofd gezien. Dat noemen we ook wel meldingmoeheid.

### Verschillende categorieën

Meldingen zijn grofweg in vier categorieën in te delen op basis van functionaliteit: Global, Sectional, Inline en Modal.

**Global (banners)**
Banners verschijnen helemaal bovenaan het scherm en verschuiven de inhoud eronder. Ze geven informatie over de beschikbaarheid van het product.

![Banner verschijnt bovenaan het scherm]({{ '/docs/images/global.jpg' | path }})

**Section (alerts)**
Plaats alerts op een bepaald gebied van een pagina of bovenaan een onderdeel waar ze bij horen. Ze geven contextuele feedback op acties van de gebruiker of laten belangrijke informatie zien.

![Alert verschijnt op een deel van een pagina]({{ '/docs/images/section.jpg' | path }})

**Inline (validatie)**
Inline validatie is meteen te zien na een gebruikersactie. De feedback verschijnt dus in real time. De melding verschijnt bij het component en moedigt de gebruiker aan om meteen iets te doen.

![Inline validatie verschijnt na een gebruikersactie]({{ '/docs/images/inline.jpg' | path }})

**Modal**
Modals onderbreken de flow van de gebruiker en vragen om actie. Ze zijn geschikt wanneer de gebruiker zijn aandacht moet richten op belangrijke informatie.

![Een modal verschijnt bij de focus op belangrijke informatie]({{ '/docs/images/modal.jpg' | path }})

**Beslissen wat je gaat gebruiken**

| Type melding       | Functie van melding                                                                                   | Duur en interactie                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Global (banners)   | Systeemmeldingen die niet specifiek gekoppeld zijn aan een taak.                                      | Blijven staan totdat de gebruiker ze verwijdert of het probleem is opgelost.                                      |
| Section (alerts)   | Geven gebruikers niet-storende feedback of laten belangrijke systeemmeldingen zien.                   | Blijven staan totdat het probleem is opgelost.                                                                    |
| Inline (validatie) | Geven gebruikers niet-storende feedback voor specifieke invoer.                                       | Blijven staan totdat het probleem is opgelost.                                                                    |
| Modals             | Zeer storende meldingen die gebruikers essentiële informatie geven die hun aandacht of actie vereist. | Blokkeren andere taken totdat de gebruiker ze verwijdert. Modals staan meer interacties toe dan andere meldingen. |

### Digitoegankelijkheid

Zorg ervoor dat screenreaders ook meldingen voor gebruikers kunnen voorlezen. Doe dat bijvoorbeeld door een ARIA role toe te voegen bij visuele meldingen, zoals een banner, alert of inline validatie. Hoe u dat het beste kunt doen, staat bij de componenten zelf.

**Sr-only en ARIA roles**
Soms is het belangrijk dat de gebruiker veranderingen op het scherm ziet. Bijvoorbeeld ter bevestiging van een uitgevoerde actie of om de status van de applicatie te volgen. Dan is het vaak nodig om sr-only meldingen te geven of om de screenreader bepaalde veranderende informatie te laten voorlezen.

**Sr-only meldingen zijn meldingen die wel door de screenreader worden uitgesproken maar niet op het scherm verschijnen.**

Hiervoor zijn 2 technieken beschikbaar:

- Voeg een `.sr-only` element in met role alert. Het effect is dat de screenreader uitspreekt "melding [tekst in element]". Om problemen te voorkomen, is het belangrijk om deze alerts regelmatig 'op te ruimen'. Bij een nieuwe alert moet de vorige alert in ieder geval eerst worden verwijderd.
- Maak van een element met veranderende tekst een aria live region. Iedere keer als er iets verandert in het element, wordt de tekst voorgelezen. Geef daarvoor het element de `role="region"` en het attribuut `aria-live="polite"`. Polite is de standaard prioriteit voor `aria-live` attributen. In uitzonderlijke gevallen is de prioriteit "assertive" nodig.

Houd zowel bij `.sr-only` alerts als bij `aria-live` regions de tekst zo kort mogelijk. De tekst wordt namelijk voorgelezen. Gebruik `.sr-only` alerts voor eenmalige meldingen. Gebruik `aria-live` regions juist om gebruikers doorlopend van een status op de hoogte te houden.

Ter illustratie twee voorbeelden van hoe belangrijk deze elementen zijn:

- Als een gebruiker in een winkelwagentje de verwijderknop van een product indrukt, verdwijnt het uit de lijst. Een blinde gebruiker ziet dit niet gebeuren. Hij of zij weet dus niet zeker of het gelukt is om het product te verwijderen. Daarom moet een `.sr-only` alert "[productnaam] verwijderd" dat bevestigen.
- Een blinde gebruiker zoekt een adres. Terwijl de gebruiker het adres invult, verschijnen de zoekresultaten in beeld. De tekst "7 resultaten" verschijnt in beeld. Als u hier een `aria-live` region van maakt, wordt het aantal resultaten steeds voorgelezen, ook als het verandert.

`.sr-only` meldingen en `aria-live` regions gebruiken is maatwerk. Betrek er altijd iemand met genoeg screenreader-ervaring bij als u dit soort meldingen gaat maken en testen. De toegankelijkheidsexpert van het DSO is bijvoorbeeld zo iemand.

**Test met een screenreader**
Pas op dat u de gebruiker niet overbelast met informatie. Blinde mensen gebruiken een website fundamenteel anders dan ziende mensen. Daarom is het belangrijk om te begrijpen hoe screenreaders werken. De ARIA `role="alert"` onderbreekt bijvoorbeeld de flow van de screenreader. Gebruik hem dus alleen als het echt nodig is. Het allerbeste zou zijn om de applicatie te laten testen door blinde gebruikers. Zo weet u meteen of de applicatie toegankelijk is voor deze doelgroep.

### Bronvermelding

- Nielsen Norman Group (1994, 24 april). 10 Usability Heuristics for User Interface Design. Geraadpleegd op 20 juli 2020, via https://www.nngroup.com/articles/ten-usability-heuristics/
- Atlassian. Understanding and fighting alert fatigue. Geraadpleegd op 2 oktober 2020, via https://www.atlassian.com/incident-management/on-call/alert-fatigue
- Nielsen Norman Group (2015, 26 juli). Indicators, Validations, and Notifications. Geraadpleegd op 2 oktober 2020, via https://www.nngroup.com/articles/indicators-validations-notifications/
- Nielsen Norman Group (2018, 3 juni). Visibility of System Status. Geraadpleegd op 2 oktober 2020, via https://www.nngroup.com/articles/visibility-system-status/
- De Voorhoede (2016, 27 december). Improving accessibility for the blind: 8 guidelines Improving accessibility for the blind. Geraadpleegd op 16 oktober 2020, via https://www.voorhoede.nl/en/blog/improving-accessibility-for-the-blind-8-guidelines/
- Accessibility Developer Guide (2018, 15 mei 15). Noticing screenreaders using alert role. Geraadpleegd op 16 oktober 2020, via https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/alert/
