# Form

## Technische opmerkingen:

Een formulier begint altijd met een `form`-element. Als een `form`-element ongewenst is kan een element met de class `.form` worden ingezet. Elke _textuele_ `input` **en** `select` zit in een `.form-group`. Elk formulier onderdeel is een _groep_ met een `label`.

- Een eventuele toelichting zit in een `p.dso-help-block`. Als er een toelichting is, dient deze met een `@aria-describedby` aan de werkvorm gekoppeld te worden.
- Een label bij een _textuele_ `input` **of** `select` eindigt altijd met een dubbele punt.

Buttons worden uitgelijnd afhankelijk van de context:

- Buttons worden gesorteerd op belangrijkheid van rechts naar links, met de primaire actie aan de rechterkant. Wanneer knoppen gebruikt worden om door een reeks schermen te navigeren, wordt de primaire knop rechts uitgelijnd en de 'terug' actie helemaal links om de navigatie visueel te ondersteunen.
- Uitgezonderd zijn formulieren met één pagina en gerichte taken, buttons links uitlijnen en sorteren op belangrijkheid van links naar rechts.

De uitzonderingen worden met de modifier `.dso-single-page` ingezet (op het bovenliggende `form` of `.form`, of op `.dso-form-buttons` zelf).

Zie ook: [H91: Using HTML form controls and links](https://www.w3.org/TR/WCAG20-TECHS/H91)

## Formuliervalidatie

Het kan zijn dat de gebruiker fouten maakt tijdens het invullen van het formulier. We laten het de gebruiker op twee momenten weten als hij fouten maakt of een verplicht invoerveld overslaat.

Ten eerste wordt een invoerveld gevalideerd als de focus wordt verplaatst. Er verschijnt dan een instructie direct onder het invoerveld. En als tweede op het moment dat de gebruiker op de "submit"-button klikt. Zet dan een samenvatting in een alert boven het formulier. Voorzie tegelijk de fout ingevulde invoervelden van inline validatie. Zet de focus in het eerste foutieve invoerveld. Om snel te kunnen navigeren, wordt er in de alert/samenvatting een lijst met anchor links opgenomen naar de betreffende invoervelden.

### Inline validatie

**Verplichte velden**
Op het moment dat de gebruiker focus verplaatst uit het verplichte invoerveld of het formulier indient, verschijnt er een foutmelding direct onder het betreffende invoerveld: dit is een `.dso-message` waar met `@aria-describedby` naar verwezen moet worden. De `.dso-message` krijgt een `role="alert"`-attribuut. Deze vorm van validatie wordt toegepast op alle formulierelementen.

- Voorkom dat inline-validatie op focus wordt weergegeven. In dit geval wordt de foutmelding al weergegeven zonder dat de gebruiker begonnen is met typen.
- Valideer niet na elk getypt teken. Deze aanpak verhoogt niet alleen het aantal onnodige validatiepogingen, maar frustreert gebruikers ook. Er zijn een paar uitzonderingen op deze regel:
  - Het is handig om inline te valideren terwijl de gebruiker typt bij het maken van een wachtwoord. Zo controleert u of het wachtwoord voldoet aan de eisen.
  - Als een gebruiker een gebruikersnaam maakt, om te controleren of een naam beschikbaar is.
  - Als een gebruiker een bericht typt met een tekenlimiet.

![Formulier met verplichte invoervelden](/docs/form/form-verplicht.jpg)

**Verplicht invoerformaat**
Net als de verplichte velden kunnen er ook verplichte invoerformaten zijn. Bijvoorbeeld een e-mailadres wat de vorm naam@domein.nl moet hebben. Het is belangrijk om vóór het invoerveld duidelijk te maken wat de eisen zijn aan de invoer, óf automatisch de invoer te corrigeren. Bijvoorbeeld: Postcode (1234 AB). Het beste is om de instructie binnen het labelelement te plaatsen zodat de instructie wordt voorgelezen als de bezoeker op het invoerveld staat.

![Formulier met verplicht invoerformaat](/docs/form/form-verplicht-formaat.jpg)

### Toegankelijkheid meldingen

De formulierwerkvormen kunnen voorzien worden van een:

- foutmelding (een `.dso-message`)
- invoer hulptekst (een `.dso-help-block`)
- vaste toelichting (een `.dso-info`)

Al deze onderdelen dienen een uniek `id` te krijgen, en daarnaar wordt verwezen met een `aria-describedby` attribuut vanuit:

- als het een 'simpele' inputvorm is: de `input` zelf (of `textarea` of `select`)
- als het een complexe groepsvorm is (zoals radios en checkboxes): de `fieldset`

### Alerts

Als het formulier wordt ingediend en er zijn invoervelden niet of niet juist ingevuld, verschijnt er een alert boven het formulier. De alert krijgt een `role="alert"`, zodat het direct door screenreaders wordt voorgelezen. In de alert staan één of meerdere anchor links naar de invoervelden. Zodra een invoerveld is gecorrigeerd, verdwijnt deze uit de melding.

![Formulier alert](/docs/form/form-alert.jpg)
![Formulier alert met samenvatting](/docs/form/form-alert-samenvatting.jpg)

### Formulier met accordions

Als het formulier accordions gebruikt, moet het duidelijk zijn waar de fout ingevulde invoervelden zich bevinden. Hiervoor tonen we een indicator-icoon op de betreffende accordion heading. Let op: bij geneste accordions moet ook de bovenliggende accordion een icoon krijgen. Zo is het fout ingevulde invoerveld te herleiden als de accordion is dichtgeklapt.

![Formulier met accordions](/docs/form/form-accordion.jpg)

### Bronvermelding

- Nielsen Norman Group (2019, 03 February). How to Report Errors in Forms. Geraadpleegd op 13 oktober 2020, via https://www.nngroup.com/articles/errors-forms-design-guidelines/
- Nielsen Norman Group (2015, 26 juli). Indicators, Validations, and Notifications. Geraadpleegd op 2 oktober 2020, via https://www.nngroup.com/articles/indicators-validations-notifications/
- Web Content Accessibility Guidelines (2018, 05 June). WC3. Geraadpleegd op 13 oktober 2020, via https://www.w3.org/WAI/standards-guidelines/wcag/
- hiddedevries.nl (2017, 04 April). How to make inline error messages accessible. Geraadpleegd op 13 oktober 2020, via https://hiddedevries.nl/en/blog/2017-04-04-how-to-make-inline-error-messages-accessible
