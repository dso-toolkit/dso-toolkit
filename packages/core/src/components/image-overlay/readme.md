# `<dso-image-overlay>`



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                  | Default     |
| -------- | --------- | ----------- | --------------------- | ----------- |
| `alt`    | `alt`     |             | `string \| undefined` | `undefined` |
| `src`    | `src`     |             | `string \| undefined` | `undefined` |


## Events

| Event   | Description | Type                     |
| ------- | ----------- | ------------------------ |
| `close` |             | `CustomEvent<undefined>` |


## Dependencies

### Used by

 - [dso-image-overlay](.)

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-image-overlay-overlay --> dso-icon
  dso-image-overlay --> dso-image-overlay-overlay
  style dso-image-overlay-overlay fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
