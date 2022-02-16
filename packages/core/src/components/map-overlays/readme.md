# dso-map-overlays

Private component, do not use.

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute | Description | Type        | Default     |
| ----------------------- | --------- | ----------- | ----------- | ----------- |
| `overlays` _(required)_ | --        |             | `Overlay[]` | `undefined` |


## Events

| Event           | Description | Type                              |
| --------------- | ----------- | --------------------------------- |
| `toggleOverlay` |             | `CustomEvent<OverlayChangeEvent>` |


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
