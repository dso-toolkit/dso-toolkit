# `<dso-annotation-omgevingsnormwaarde>`



<!-- Auto Generated Below -->


## Overview

Dit component wordt voor een Omgevingsnorm en Omgevingswaarde gebruikt.

## Properties

| Property            | Attribute            | Description                                                                         | Type                                                                                                           | Default     |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| `active`            | `active`             | Een optionele boolean die aangeeft of de annotatie actief is.                       | `boolean \| undefined`                                                                                         | `undefined` |
| `eenheid`           | `eenheid`            | De eenheid van de omgevingsnorm of omgevingswaarde.                                 | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `gewijzigdeLocatie` | `gewijzigde-locatie` | Een optionele boolean die aangeeft of de locatie van de annotatie gewijzigd is.     | `boolean \| undefined`                                                                                         | `undefined` |
| `naam`              | `naam`               | De naam van de omgevingsnorm of omgevingswaarde.                                    | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `toelichting`       | `toelichting`        | De toelichting van de waardes.                                                      | `string \| undefined`                                                                                          | `undefined` |
| `waardes`           | --                   | De waardes van de omgevingsnorm of omgevingswaarde.                                 | `RenvooiValue[] \| undefined`                                                                                  | `undefined` |
| `wijzigactie`       | `wijzigactie`        | Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is. | `"verwijder" \| "voegtoe" \| undefined`                                                                        | `undefined` |


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
  dso-annotation-omgevingsnormwaarde --> dso-renvooi
  dso-annotation-omgevingsnormwaarde --> dso-slide-toggle
  dso-annotation-omgevingsnormwaarde --> dso-label
  dso-label --> dso-icon-button
  dso-label --> dso-tooltip
  dso-icon-button --> dso-icon
  style dso-annotation-omgevingsnormwaarde fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
