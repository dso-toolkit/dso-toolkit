# dso-logo

Een Web Component waarmee een slim, toegankelijk en uniform logo in applicaties kan worden getoond.

Om alleen het beeldmerk (de 'target') en het woordmerk (de tekst "Omgevingsloket" in de kleur grasgroen, waarvan het woord "loket" in bosgroen) te tonen:

```html
<dso-logo></dso-logo>
```

Eventueel kunnen een `label` (applicatienaam, portaalnaam of kruimelpadlocatie) en `ribbon` (status of servernaam) worden meegegeven:

```html
<dso-logo label="Regels op de kaart" ribbon="Beta"></dso-logo>
```

Een `label` toont de titel of naam van de applicatie waar je je als bezoeker in bevindt.

Een `ribbon` is een soort sticker die overlapt met het woordmerk, waar een maximaal vijf-letterige tekst in kan komen te staan om de status van de pagina aan te duiden. Bijvoorbeeld "Beta", "Test", "Acc", of "Pre".
