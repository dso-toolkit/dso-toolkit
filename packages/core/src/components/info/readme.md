# `<dso-info>`

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                       | Type                   | Default     |
| -------- | --------- | ----------------------------------------------------------------- | ---------------------- | ----------- |
| `active` | `active`  | Whether the Info is active.                                       | `boolean \| undefined` | `undefined` |
| `fixed`  | `fixed`   | Set to true if the Info should not be toggled and always visible. | `boolean \| undefined` | `undefined` |


## Events

| Event      | Description                                       | Type                      |
| ---------- | ------------------------------------------------- | ------------------------- |
| `dsoClose` | Emitted when the user activates the close button. | `CustomEvent<MouseEvent>` |


## Dependencies

### Used by

 - [dso-selectable](../selectable)

### Depends on

- [dso-icon-button](../icon-button)

### Graph
```mermaid
graph TD;
  dso-info --> dso-icon-button
  dso-icon-button --> dso-icon
  dso-icon-button --> dso-scrollable
  dso-selectable --> dso-info
  style dso-info fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
