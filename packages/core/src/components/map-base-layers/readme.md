# dso-base-layers



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute | Description | Type                     | Default     |
| ------------------------- | --------- | ----------- | ------------------------ | ----------- |
| `baseLayers` _(required)_ | --        |             | `BaseLayer[]`            | `undefined` |
| `selectedBaseLayer`       | --        |             | `BaseLayer \| undefined` | `undefined` |


## Events

| Event             | Description | Type                     |
| ----------------- | ----------- | ------------------------ |
| `baseLayerChange` |             | `CustomEvent<BaseLayer>` |


## Dependencies

### Depends on

- [dso-selectable](../selectable)

### Graph
```mermaid
graph TD;
  dso-map-base-layers --> dso-selectable
  dso-selectable --> dso-info-button
  dso-selectable --> dso-info
  style dso-map-base-layers fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
