# `<dso-renvooi>`

<!-- Auto Generated Below -->


## Overview

Met dit component kan een `RenvooiValue` worden gepresenteerd.

## Properties

| Property | Attribute | Description                  | Type                                                                                                                             | Default     |
| -------- | --------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `mark`   | `mark`    | To mark text.                | `((text: string, value: RenvooiValue, source: RenvooiValue[]) => RenvooiText[]) \| undefined`                                    | `undefined` |
| `value`  | `value`   | The renvooi value to render. | `RenvooiValue[] \| string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |


## Events

| Event                         | Description                                | Type                                         |
| ----------------------------- | ------------------------------------------ | -------------------------------------------- |
| `dsoRenvooiMarkItemHighlight` | Emitted when a marked item is highlighted. | `CustomEvent<RenvooiMarkItemHighlightEvent>` |


## Dependencies

### Used by

 - [dso-accordion-section](../accordion/components)
 - [dso-annotation-activiteit](../annotation/annotation-activiteit)
 - [dso-annotation-gebiedsaanwijzing](../annotation/annotation-gebiedsaanwijzing)
 - [dso-annotation-kaart](../annotation/annotation-kaart)
 - [dso-annotation-locatie](../annotation/annotation-locatie)
 - [dso-annotation-omgevingsnormwaarde](../annotation/annotation-omgevingsnormwaarde)

### Graph
```mermaid
graph TD;
  dso-accordion-section --> dso-renvooi
  dso-annotation-activiteit --> dso-renvooi
  dso-annotation-gebiedsaanwijzing --> dso-renvooi
  dso-annotation-kaart --> dso-renvooi
  dso-annotation-locatie --> dso-renvooi
  dso-annotation-omgevingsnormwaarde --> dso-renvooi
  style dso-renvooi fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
