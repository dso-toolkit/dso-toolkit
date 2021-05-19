# dso-map-overlays



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute | Description | Type        | Default     |
| ----------------------- | --------- | ----------- | ----------- | ----------- |
| `checkedOverlays`       | --        |             | `Overlay[]` | `[]`        |
| `overlays` _(required)_ | --        |             | `Overlay[]` | `undefined` |


## Events

| Event                   | Description | Type                     |
| ----------------------- | ----------- | ------------------------ |
| `checkedOverlaysChange` |             | `CustomEvent<Overlay[]>` |


## Dependencies

### Depends on

- [dso-selectable](../selectable)

### Graph
```mermaid
graph TD;
  dso-map-overlays --> dso-selectable
  dso-selectable --> dso-info-button
  dso-selectable --> dso-info
  style dso-map-overlays fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
