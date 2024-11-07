# `<dso-annotation-kaart>`



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                    | Type                                                                                                           | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| `href`        | `href`        | De url naar de kaart.  Gebruik het event `dsoClick` om de navigatie aan de router te koppelen. | `string \| undefined`                                                                                          | `undefined` |
| `naam`        | `naam`        | De naam van de kaart.                                                                          | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `wijzigactie` | `wijzigactie` | Een optionele wijzigactie die aangeeft of de annotatie is toegevoegd of verwijderd.            | `"verwijder" \| "voegtoe" \| undefined`                                                                        | `undefined` |


## Events

| Event      | Description                                                                                                                                                        | Type                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `dsoClick` | Event als de gebruiker de kaartnaam selecteert.  Let op "isModifiedEvent" om te bepalen of de navigatieactie door de router of de browser moet worden afgehandeld. | `CustomEvent<AnnotationKaartClickEvent>` |


## Dependencies

### Depends on

- [dso-renvooi](../../renvooi)
- [dso-icon](../../icon)
- [dso-slide-toggle](../../slide-toggle)

### Graph
```mermaid
graph TD;
  dso-annotation-kaart --> dso-renvooi
  dso-annotation-kaart --> dso-icon
  dso-annotation-kaart --> dso-slide-toggle
  style dso-annotation-kaart fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
