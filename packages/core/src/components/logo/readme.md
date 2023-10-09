# dso-logo

Een Web Component waarmee een slim, toegankelijk en uniform logo in applicaties kan worden getoond.

## Gebruik

Enkel het component zelf gebruiken is voldoende. Dit toont alleen het beeldmerk (de 'target') en het woordmerk (de tekst "Omgevingsloket" in de kleur grasgroen, waarvan het woord "loket" in bosgroen):

```html
<dso-logo></dso-logo>
```

Eventueel kunnen een `label` (applicatienaam, portaalnaam of kruimelpadlocatie) en `ribbon` (status of servernaam) worden meegegeven:

```html
<dso-logo label="Regels op de kaart" ribbon="Beta"></dso-logo>
```

Een `label` toont de titel of naam van de applicatie waar je je als bezoeker in bevindt.

Een `ribbon` is een soort sticker die overlapt met het woordmerk, waar een maximaal vijf-letterige tekst in kan komen te staan om de status van de pagina aan te duiden. Bijvoorbeeld "Beta", "Test", "Acc", of "Pre".


## Responsive gedrag

Op schermen die breed genoeg zijn om het beeldmerk, het woordmerk en de applicatienaam (of portaalnaam of kruimelpadlocatie) volledig te tonen, komen deze naast elkaar in beeld. 

Op schermen die wat smaller zijn (maximaal 767px) vervalt het woordmerk en wordt alleen de applicatienaam, portaalnaam of kruimelpadlocatie getoond naast het beeldmerk.

Op schermen minder dan 480 px breed zit een eventuele `ribbon` een paar pixels hoger, om overlap met de tekst van de applicatie te voorkomen.

## Toegankelijkheid

Als er een `label` en/of een `ribbon` worden toegevoegd, worden deze op het component gezet met een aria-label.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                     | Type                  | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `label`  | `label`   | The label clarifies the service within the Omgevingsloket, shown as a subtitle (and on smaller screens as the main wordmark itself). Max-length: 20 characters. | `string \| undefined` | `undefined` |
| `ribbon` | `ribbon`  | The ribbon contains the text for a possible 'sticker' on top of the logo. Used to clarify status of the page, like 'beta'. Max-length: 5 characters.            | `string \| undefined` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
