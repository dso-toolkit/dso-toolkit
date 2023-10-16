# `.dso-logo`

Een Web Component waarmee een slim, toegankelijk en uniform logo in applicaties kan worden getoond.

## Achtergrond

Logo's zijn een beetje 'n ondergeschoven kindje. In de Header is een `<slot name="logo" />` beschikbaar, maar elke applicatie regelt zelf zijn logo.

De toolkit levert voor een aantal (maar weer niet alle) applicaties logo's, maar die zijn volgens een oud ontwerp.

In #2176 hebben wij (nogmaals) gerealiseerd dat het logo een blinde vlek is. In de toolkit werkt de Header precies zoals verwacht, maar in (meerdere) applicaties valt alles toch net niet op z'n plek: de toegankelijkheid laat de wensen over of de Header valt responsive uit elkaar.

De logo's zijn SVG's. De tekst in de SVG is nu een shape. Hierdoor is een logo al niet toegankelijk en moeten we voor elke applicatie een eigen logo aanbieden (en onderhouden).

## Voorstel

```html
<dso-logo logo="Omgevingsloket" label="Regels op de kaart" ribbon="Beta"></dso-logo>
```

![Header voorstel](https://github.com/dso-toolkit/dso-toolkit/assets/36912722/5b88f2a8-ed43-400c-b7b9-2cb79e2891a4)

### Responsive gedrag

Change:

- Wanneer er een label aanwezig (bijv. Regels op de kaart)
- Vanaf het bootstrap omslagpunt col-xs (<768) valt omgevingsloket weg en wordt vervangen op die plek door het label
- Is er geen label dan blijft Omgevingsloket staan

### `Log`

Staat hier altijd Omgevingsloket, volgens de licht/donkergroene kleurstelling? **Antwoord: Ja**

### `Label`

Is dit altijd de titel/naam van de applicatie? Dan misschien beter `application-title` of `application-name`. **Antwoord: Besloten is dit Label te noemen.**

### `ribbon`

Hiermee kan de tekst "Beta" worden getoond. De achterliggende gedachte is dat applicaties routines maken dat vanaf 1 januari deze ribbon niet meer wordt gezet waarmee het Logo component deze niet meer zal tonen.

Het ligt voor de hand dat deze routines in het Web Component komen, maar vanaf 1 januari zullen er nog steeds testomgevingen bestaan.

Een andere overweging is een boolean attribute `beta`, maar ik wil met een vrije invoer de smaken "test", "acceptatie", "performance" introduceren waarmee we de verschillende omgevingen visueel uit elkaar kunnen gaan houden. -> **Antwoord: Uitstekend idee, ook andere kleuren? Wel telken afkortingen gebruiken TST,ACC,PRE. All capitals altijd. Tijdelijk zal beta logo verdwijnen rond IWT tijd op alle omgevingen ivm met simpliciteit.**
