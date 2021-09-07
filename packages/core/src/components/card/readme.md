# `dso-card`, `dso-cards`, `dso-card-interaction`, `dso-card-interactions`



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description | Type     | Default     |
| -------------------- | -------------- | ----------- | -------- | ----------- |
| `interactions`       | `interactions` |             | `any`    | `undefined` |
| `label` _(required)_ | `label`        |             | `string` | `undefined` |


## Dependencies

### Used by

 - [dso-card](.)

### Depends on

- [dso-card-interaction](.)

### Graph
```mermaid
graph TD;
  dso-card-interactions --> dso-card-interaction
  dso-card-interaction --> dso-icon
  dso-card --> dso-card-interactions
  style dso-card-interactions fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
