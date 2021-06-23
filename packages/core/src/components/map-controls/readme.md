# dso-map-controls



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                                   | Default     |
| ------------- | -------------- | ----------- | -------------------------------------- | ----------- |
| `disableZoom` | `disable-zoom` |             | `"both" \| "in" \| "out" \| undefined` | `undefined` |
| `open`        | `open`         |             | `boolean`                              | `false`     |


## Events

| Event     | Description | Type                      |
| --------- | ----------- | ------------------------- |
| `zoomIn`  |             | `CustomEvent<MouseEvent>` |
| `zoomOut` |             | `CustomEvent<MouseEvent>` |


## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-map-controls --> dso-icon
  style dso-map-controls fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
