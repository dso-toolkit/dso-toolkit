---
label: Modals
order: 9
---
Modals zijn schermelementen die de hoofdflow van de gebruiker onderbreken. Goed doordachte inhoud en het juiste verschijningsmoment van modals zorgen ervoor dat het bezoek van de gebruiker intuïtief verloopt en de ervaring biedt die hij of zij verwacht. Het zal helpen bij het vermijden van de constante storingsfactor van een misplaatste modal (verkeerd gebruik van een modal).

## Wanneer te gebruiken:

- **Onderbreking:** de gebruiker dwingen een beslissing te nemen of een taak te voltooien voor een belangrijk deel van hun workflow. Stel jezelf de vraag, "wil ik de gebruiker echt onderbreken?"
- **Feedback of correctie:** beslissingen bevestigen. Bijvoorbeeld: bij een "Weet je het zeker?"-moment.
- **Aandacht punt:** de focus van de gebruiker expliciet richten op een enkel stuk inhoud, of het nu een afbeelding, artikel of video is.

{{frame (path '/components/preview/dialog--valid') '.dso-dialog' }}

## Wanneer _niet_ te gebruiken

Modals zijn bedoeld om belangrijke bevestigingen en beslissingen te benadrukken. Het is niet wenselijk ingewikkelde interacties in een modal stoppen. Zoals een formulier, of een uitgebreide zoeklijst.

Een modal dient alleen gebruikt te worden voor simpele interacties. Probeer ingewikkelde interacties op andere manieren in een pagina te verwerken.

{{frame (path '/components/preview/dialog--invalid') '.dso-dialog' }}

## Gedrag en toegankelijkheid

1. Wanneer een modal geactiveerd wordt moet de focus verplaatst worden naar het modal. Vervolgens binnen het modal naar het eerste interactieve element.
2. Een modal moet een accessible naam hebben en zowel visueel als in de code, voor screenreaders, zichzelf presenteren als een modal.
3. De volgende standaard methodes moeten beschikbaar zijn voor de gebruiker om een modal te sluiten:

    * Close button, dit mag het kruisje rechtsboven zijn of een annuleer knop in de modal footer;
    * De escape knop sluit een modal, zodat toetsenbord gebruikers ook een modal kunnen sluiten;
    * Buiten een modal klikken sluit ook een modal;

4.  Als een modal actief is kan een gebruiker nog altijd naar de adresbalk van de browser navigeren.
5.  Wanneer een modal actief is moeten alle elementen die bedekt worden door het modal venster met overlay niet toegankelijk zijn. Dit betekent dat als de tabkey gebruikt wordt de focus binnen de modal blijft en het niet mogelijk is content buiten de modal te benaderen.
6.  Wanneer een modal dialog gesloten wordt dan moet de focus terug gaan naar het element dat de modal heeft geopend.

Dit staat gebruikers toe om de verder te gaan waar ze gebleven waren. Als een modal niet is aangeroepen door een actie van een gebruiker dan moet de focus geplaatst worden op een logische locatie. Als een modal bijv. 'onPageLoad' wordt aangeroepen dan is het beste om na het sluiten van een modal de virtuele focus aan het begin van de pagina te zetten.