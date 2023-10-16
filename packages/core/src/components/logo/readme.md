# dso-logo

Een Web Component waarmee een slim, toegankelijk en uniform logo in applicaties kan worden getoond. Het ontwerp van het logo is [nagemaakt in Figma](https://www.figma.com/file/F9VXMV09Zj1tbkVU5ncTyE/Untitled?type=design&node-id=0%3A1&mode=design&t=XWWG6MnFI2VO7A6o-1) voor het genereren van de SVG. 

## Gebruik

```html
<dso-logo logo="Omgevingsloket" label="Regels op de kaart" ribbon="Beta"></dso-logo>
```

## Varianten

Het component kan op meerdere manieren worden ingezet:

- Alleen het beeldmerk (de 'target') en het woordmerk (de tekst "Omgevingsloket" in de kleur grasgroen, waarvan het woord "loket" in bosgroen)
- Een variant met een zogenaamd 'label', de naam van de afdeling of sub-site onder de tekst "Omgevingsloket", in het grijs
- Een variant met een 'ribbon', een tag waar een maximaal vijf-letterige tekst in kan komen te staan om de status van de pagina aan te duiden. Bijvoorbeeld "Beta", "Test", "Acc", of "Pre".

## Gebruik

```
<dco-logo label="" ribbon=""></dco-logo>
```

- `label`: Het label is altijd de titel of naam van de applicatie.
- `ribbon`: Met ribbon kan een tekst op een soort sticker op het logo worden getoond, bijvoorbeeld om de beta status van een applicatie weer te geven ("beta"), of de omgeving waarop het logo gebruikt wordt ("Acc", "Test", "Pre").

## Responsive gedrag

## Toegankelijkheid

Als er een label wordt toegevoegd, en een ribbon, worden deze op het component gezet via aria-label.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                          | Type                  | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `label`  | `label`   | The label clarifies the service within the Omgevingsloket, shown as a subtitle (and on smaller screens as the main wordmark itself). | `string \| undefined` | `undefined` |
| `ribbon` | `ribbon`  | The ribbon contains the text for a possible tag on top of the logo. Used to clarify status of the page, like 'beta'.                 | `string \| undefined` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
