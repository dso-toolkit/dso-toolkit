# `<dso-info>`



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                   | Default     |
| -------- | --------- | ----------- | ---------------------- | ----------- |
| `active` | `active`  |             | `boolean \| undefined` | `undefined` |
| `fixed`  | `fixed`   |             | `boolean \| undefined` | `undefined` |


## Events

| Event      | Description | Type                      |
| ---------- | ----------- | ------------------------- |
| `dsoClose` |             | `CustomEvent<MouseEvent>` |


## Dependencies

### Used by

 - [dso-selectable](../selectable)

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-info --> dso-icon
  dso-selectable --> dso-info
  style dso-info fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
