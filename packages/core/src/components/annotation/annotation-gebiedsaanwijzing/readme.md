# `<dso-annotation-gebiedsaanwijzing>`



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                         | Type                                                                                                           | Default     |
| ------------- | ------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| `active`      | `active`      | Een optionele boolean die aangeeft of de annotatie actief is.                       | `boolean \| undefined`                                                                                         | `undefined` |
| `naam`        | `naam`        | De naam van de gebiedsaanwijzing.                                                   | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `wijzigactie` | `wijzigactie` | Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is. | `"verwijder" \| "voegtoe" \| undefined`                                                                        | `undefined` |


## Events

| Event             | Description                                                                   | Type                                       |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `dsoActiveChange` | Een optionele event listener voor wijzigingen aan de status van de annotatie. | `CustomEvent<AnnotationActiveChangeEvent>` |


## Slots

| Slot     | Description                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| `"meta"` | Een optioneel slot voor een `Label`, bijvoorbeeld om aan te geven dat de locatie van de annotatie gewijzigd is. |


## Dependencies

### Depends on

- [dso-renvooi](../../renvooi)
- [dso-slide-toggle](../../slide-toggle)

### Graph
```mermaid
graph TD;
  dso-annotation-gebiedsaanwijzing --> dso-renvooi
  dso-annotation-gebiedsaanwijzing --> dso-slide-toggle
  style dso-annotation-gebiedsaanwijzing fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
