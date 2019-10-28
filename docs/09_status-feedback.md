---
label: Status melding
order: 9
---
Status feedback bepaalt het succes van elk systeem en is er om de gebruiker te informeren over de status van het systeem. Er zijn drie verschillende vormen van status feedback (meldingen), te weten:
- notificaties;
- validatoren;
- indicatoren.

Om gebruikers te kunnen helpen is het belangrijk te weten wanneer deze drie vormen van meldingen gebruikt worden en welke boodschap men daarbij wil aanduiden. De vorm van communiceren is afhankelijk van:
- het type informatie wat gecommuniceerd moet worden;
- hoe belangrijk is het dat de gebruiker de informatie direct ziet;
- moet de gebruiker al dan niet actie ondernemen.

## Hoe te gebruiken: notificaties
Notificaties zijn binnenkomende mededelingen (kennisgeving) over een gebeurtenis, geconstateerde waarneming of een geconstateerd feit binnen een systeem. Notificaties kunnen zowel informatief als aanmoedigend zijn bij te nemen acties en kunnen op elk moment door het systeem geleverd worden, ook als de gebruiker niet daadwerkelijk bezig is met het systeem. Meldingen kunnen zowel contextueel (van toepassing op een specifiek UI element) als globaal zijn (van toepassing op een systeem).
- Niet gegenereerd door directe gebruikers acties
- Kondigen een gebeurtenis aan die van belang is voor de gebruiker

Er zijn verschillende soorten notificaties:

### Notificaties die een actie vereisen
Dit is een urgente mededeling waarbij de gebruiker actie moet ondernemen, en moet daarom ontworpen zijn om de gebruiker bewust in zijn/haar proces te onderbreken. Het gebruik van een modal is bijvoorbeeld geschikt omdat deze direct aandacht vraagt en van de gebruiker een actie vereist om deze te sluiten.

### Notificaties die geen actie vereisen
Dit is een minder urgente en minder onderbrekende informatieve mededeling, waarbij een systeem voorval gemeld wordt wat niet direct actie vereist van de gebruiker. Dit kan een notificatie zijn die enkele seconden, bovenin een hoek in beeld is en dan weer verdwijnt.

### Sectieberichten
Sectieberichten worden gebruikt om gebruikers erop te attenderen dat er iets in een deel van het scherm is gebeurd.
Ze kunnen niet worden afgewezen en zullen pas verdwijnen als de situatie is opgelost of de gebruiker actie heeft ondernomen.

{{frame (path '/components/preview/alert') '.container'}}

Een sectiebericht (vereist een actie):
- Waarschuwt dat bepaalde acties gevolgen hebben;
- Communiceert dat een actie succesvol is geweest;
- Laat de gebruiker weten wanneer er iets fout is gegaan of wanneer toegang wordt geweigerd;
- Geeft een overzicht van foutieve velden als er validatie fouten zijn opgetreden.

#### Voorbeeld: sectiebericht met foutsamenvatting

Als de gebruiker via de knoppen navigeert en er zijn verplichte velden niet beantwoord, dan verschijnt er een sectiebericht.

Afhankelijk van de positie van de knop wordt de melding binnen de vragengroep of bovenaan het scherm getoond.

{{frame (path '/components/preview/alerts-validation') '.dso-example-wrapper'}}

- De melding krijgt focus (`role=alert`) zodat deze direct door screenreaders wordt voorgelezen. In de melding staan één of meerdere anchor links naar de verplichte velden. Zodra een verplicht veld is ingevuld verdwijnt deze uit de melding.

## Hoe te gebruiken: validatoren
Validatoren zijn meldingen die gerelateerd zijn aan de input van een gebruiker. Ze valideren de data die de gebruiker heeft ingevuld en kan dan aangeven of die data incompleet is of incorrect. Ook moet een validatie aangeven wat er fout is en hoe de gebruiker de fout kan herstellen zodat deze niet vastloopt.
- Gegenereerd door gebruikers actie;
- De gebruiker moet actie ondernemen om de validatie te corrigeren waardoor deze verdwijnt;
- De informatie van de validatie is contextueel en van toepassing op specifieke gebruikers invoer van data waarbij een probleem is ontstaan.

Een voorbeeld hiervan is de informatie die wordt weergegeven bij een invoerveld als de gebruiker een veld over het hoofd heeft gezien of niet goed heeft ingevuld.

### Voorbeeld: verplichte velden
Gebruik inline-validatie met realtime feedback. Deze validatie vertelt de gebruiker meteen of de informatie die ze hebben getypt, voldoet aan de vereisten van het formulier.

Idealiter verschijnen foutmeldingen nadat de gebruiker naar het volgende veld gaat (het ingevulde veld verliest dan focus).

{{frame (path '/components/preview/inputs-validation') '.dso-example-wrapper'}}

- **Voorkom dat inline-validatie op focus wordt weergegeven:** in dit geval wordt de foutmelding al weergegeven zonder dat de gebruiker begonnen is met typen.
- **Valideer niet na elk getypt teken:** deze aanpak verhoogt niet alleen het aantal onnodige validatiepogingen, maar frustreert ook gebruikers. Deze regel heeft enkele uitzonderingen: het is handig om inline te valideren terwijl de gebruiker typt bij het maken van een wachtwoord (om te controleren of het wachtwoord voldoet aan de eisen), bij het maken van een gebruikersnaam (om te controleren of een naam beschikbaar is) en bij het typen van een bericht met een tekenlimiet.

### Voorbeeld: verplicht invoer formaat

Net als de verplichte velden, kunnen er ook verplichte invoer formaten zijn.
Bijvoorbeeld een e-mailadres wat de vorm naam@domein.nl moet hebben.

Het is belangrijk om vóór het invoerveld duidelijk te maken wat de eisen zijn aan de invoer, óf automatisch de invoer te corrigeren.

{{frame (path '/components/preview/inputs-validation-format') '.dso-example-wrapper'}}

- Bijvoorbeeld: Postcode (1234 AB). Het beste is om de instructie binnen het label element te plaatsen zodat de instructie, als de bezoeker op het invoerveld staat, wordt voorgelezen

## Hoe te gebruiken: indicatoren
Indicatoren zijn manieren om duidelijk te maken dat de aandacht gevraagd wordt van de gebruiker voor een bepaald element (zoals content of een dynamisch deel van de interface). Vaak zal de indicator een verandering aangeven van dit element. Het is een visuele vorm die de aandacht moet trekken en kan bijvoorbeeld een icoon, een typografische variatie, groter font of een animatie zijn.
- Indicatoren zijn contextueel: ze staan dichtbij het element waarmee ze geassocieerd moeten worden
- Indicatoren zijn niet altijd zichtbaar maar verschijnen of veranderen afhankelijk van de omstandigheden
- Indicatoren zijn passief en hebben geen gebruikers actie nodig maar zijn een communicatie middel om de aandacht van de gebruiker te trekken

### Voorbeelden van indicatoren
Indicatoren geven aanvullende informatie over een dynamisch stuk inhoud of een gebruikersinterface- element.
Ze zijn voorwaardelijk en kunnen verschijnen of veranderen onder specifieke omstandigheden.
Een indicator kan zelfstandig worden toegepast, maar ook in combinatie met een sectiebericht of melding.

{{frame (path '/components/preview/indicator-icons') '.dso-example-wrapper'}}

### Indicatoren: loaders
Animaties tijdens het wachten -zoals een percentuele progress bar en spinner, informeren gebruikers over de huidige status van een systeem en maken het proces verdraagzamer voor de gebruiker door onzekerheid te verminderen. Gebruikers ervaren een hogere tevredenheid en zijn bereid langer te wachten als een dynamische voortgangs indicator zichtbaar is.

Zichtbaarheid van de status van een systeem is een van de belangrijkste en algemeen toepasbare principes van het ontwerp van een gebruikersinterface.

{{frame (path '/components/preview/loaders') '.dso-example-wrapper'}}

## Bronvermelding
- [Nielsen Norman Group](https://www.nngroup.com/)
- [Dienst digitale overheid](https://www.digitoegankelijk.nl)