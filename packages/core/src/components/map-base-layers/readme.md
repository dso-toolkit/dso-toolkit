# dso-base-layers

Private component, do not use.

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute | Description | Type          | Default     |
| ------------------------- | --------- | ----------- | ------------- | ----------- |
| `baseLayers` _(required)_ | --        |             | `BaseLayer[]` | `undefined` |
| `group`                   | `group`   |             | `string`      | `uuidv4()`  |


## Events

| Event                | Description | Type                                |
| -------------------- | ----------- | ----------------------------------- |
| `dsoBaseLayerChange` |             | `CustomEvent<BaseLayerChangeEvent>` |


## Dependencies

### Depends on

- [dso-selectable](../selectable)

### Graph
```mermaid
graph TD;
  dso-map-base-layers --> dso-selectable
  dso-selectable --> dso-info-button
  dso-selectable --> dso-info
  dso-info-button --> dso-icon
  dso-info --> dso-icon
  style dso-map-base-layers fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
