# `<dso-viewer-grid>`

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                            | Type                             | Default   |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------- | --------- |
| `filterpanelOpen` | `filterpanel-open`  |                                                                                                        | `boolean`                        | `false`   |
| `initialMainSize` | `initial-main-size` | Size of the main content panel when component loads. Changing this attribute afterwards has no effect. | `"large" \| "medium" \| "small"` | `"large"` |
| `overlayOpen`     | `overlay-open`      |                                                                                                        | `boolean`                        | `false`   |


## Events

| Event               | Description | Type                                       |
| ------------------- | ----------- | ------------------------------------------ |
| `closeOverlay`      |             | `CustomEvent<KeyboardEvent \| MouseEvent>` |
| `filterpanelApply`  |             | `CustomEvent<FilterpanelEvent>`            |
| `filterpanelCancel` |             | `CustomEvent<FilterpanelEvent>`            |
| `mainSizeChange`    |             | `CustomEvent<ViewerGridChangeSizeEvent>`   |


## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-viewer-grid --> dso-icon
  style dso-viewer-grid fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
