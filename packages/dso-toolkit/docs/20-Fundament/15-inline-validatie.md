---
label: Inline validatie
---

Een inline validatie informeert de gebruiker over fouten die relevant zijn voor specifieke invoer. De melding verschijnt onder het invoerveld nadat de gebruiker de focus verplaatst of een submit actie uitvoert.

## Technische opmerkingen
- Als een input ongeldig is, zet dan een `.dso-invalid` class op de div met de class `.dso-input`.
- Was een input ongeldig en maakt de gebruiker die valide? Vervang dan de `.dso-invalid` class door de class `.dso-valid`.

## Wanneer te gebruiken
**Verplichte velden**
Er verschijnt meteen een foutmelding onder het betreffende invoerveld als de gebruiker de focus verplaatst of het formulier indient. Deze vorm van validatie wordt toegepast op alle formulierelementen.

**Verplicht invoerformaat**
Net als de verplichte velden, kunnen er ook verplichte invoerformaten zijn. Bijvoorbeeld een e-mailadres dat de vorm `naam@domein.nl` moet hebben. Het is belangrijk om vóór het invoerveld duidelijk te maken wat de eisen zijn aan de invoer, óf automatisch de invoer te corrigeren. Bijvoorbeeld: Postcode (1234 AB). Het beste is om de instructie binnen het label-element te plaatsen zodat de instructie, als de bezoeker op het invoerveld staat, wordt voorgelezen.

## Wanneer niet te gebruiken
Idealiter zouden alle formulierelementen inline validatie hebben. Dat wil zeggen: zodra de gebruiker 'klaar' is, wordt er bij het betreffende invoerveld meteen aangegeven of er in het veld een fout staat.

Er zullen natuurlijk situaties zijn waarin inline validatie niet mogelijk is. Dan moeten gegevens die door de gebruiker zijn ingevoerd ter verificatie naar een server moeten worden gestuurd.

## Hoe te gebruiken
- Plaats inline validatie altijd direct onder het invoerveld.
- Gebruik kleur (rood) en een indicator (icoon) om de validatie melding te onderscheiden van normale instructietekst.
- Valideer geen invoervelden voordat de invoer is voltooid.
- Gebruik inline validatie in combinatie met een samenvatting boven het formulier bij submit van lange formulieren.

## Gedrag en toegankelijkheid
- Geef aan dat een veld ongeldige invoer heeft met een aria-invalid. Zorg ervoor dat dit attribuut weer verdwijnt als het niet langer van toepassing is.
- Laat de screenreader weten dat er een foutmelding is verschenen door de melding een ARIA `role="alert"` te geven.
- Voorkom dat inline-validatie op focus wordt weergegeven. In dit geval wordt de foutmelding al weergegeven zonder dat de gebruiker begonnen is met typen.
- Valideer niet na elk getypt teken. Deze aanpak verhoogt niet alleen het aantal onnodige validatiepogingen, maar frustreert gebruikers ook. Er zijn een paar uitzonderingen op deze regel:
     * Het is handig om inline te valideren terwijl de gebruiker typt bij het maken van een wachtwoord. Zo controleert u of het wachtwoord voldoet aan de eisen.
     * Als een gebruiker een gebruikersnaam maakt, om te controleren of een naam beschikbaar is.
     * Als een gebruiker een bericht typt met een tekenlimiet.

## Bronvermelding
- UX movement (2011, 24 February). Why Long Forms Need Instant Inline Validation. Geraadpleegd op 13 oktober 2020, via https://uxmovement.com/forms/why-long-forms-need-instant-inline-validation/
- Nielsen Norman Group (2019, 03 February). How to Report Errors in Forms. Geraadpleegd op 13 oktober 2020, via https://www.nngroup.com/articles/errors-forms-design-guidelines/
- Nielsen Norman Group (2015, 26 juli). Indicators, Validations, and Notifications. Geraadpleegd op 2 oktober 2020, via https://www.nngroup.com/articles/indicators-validations-notifications/
- Web Content Accessibility Guidelines (2018, 05 June). WC3. Geraadpleegd op 13 oktober 2020, via https://www.w3.org/WAI/standards-guidelines/wcag/
- hiddedevries.nl (2017, 04 April). How to make inline error messages accessible. Geraadpleegd op 13 oktober 2020, via https://hiddedevries.nl/en/blog/2017-04-04-how-to-make-inline-error-messages-accessible