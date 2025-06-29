# `<dso-annotation-activiteit>`



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                       | Description                                                                         | Type                                                                                                           | Default     |
| ----------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| `active`                      | `active`                        | Een optionele boolean die aangeeft of de annotatie actief is.                       | `boolean \| undefined`                                                                                         | `undefined` |
| `gewijzigdeLocatie`           | `gewijzigde-locatie`            | Een optionele boolean die aangeeft of de locatie van de annotatie gewijzigd is.     | `boolean \| undefined`                                                                                         | `undefined` |
| `locatieNoemers`              | `locatie-noemers`               | De noemer van de locatie.                                                           | `RenvooiValue[] \| undefined`                                                                                  | `undefined` |
| `naam`                        | `naam`                          | De naam van de activiteit.                                                          | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `regelKwalificatie`           | `regel-kwalificatie`            | De activiteit regel kwalificatie.                                                   | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `regelKwalificatieVoorzetsel` | `regel-kwalificatie-voorzetsel` | Voorzetsel van de regelKwalificatie. Exclusief dubbele punt.                        | `string \| undefined`                                                                                          | `undefined` |
| `wijzigactie`                 | `wijzigactie`                   | Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is. | `"verwijder" \| "voegtoe" \| undefined`                                                                        | `undefined` |


## Events

| Event             | Description                                                                   | Type                                       |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `dsoActiveChange` | Een optionele event listener voor wijzigingen aan de status van de annotatie. | `CustomEvent<AnnotationActiveChangeEvent>` |


## Slots

| Slot        | Description                                             |
| ----------- | ------------------------------------------------------- |
| `"symbool"` | Een optionele afbeelding die de annotatie symboliseert. |


## Dependencies

### Depends on

- [dso-renvooi](../../renvooi)
- [dso-slide-toggle](../../slide-toggle)
- [dso-label](../../label)

### Graph
```mermaid
graph TD;
  dso-annotation-activiteit --> dso-renvooi
  dso-annotation-activiteit --> dso-slide-toggle
  dso-annotation-activiteit --> dso-label
  dso-label --> dso-icon
  dso-label --> dso-tooltip
  style dso-annotation-activiteit fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
