# `<dso-viewer-grid>`

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                                                      | Type                                          | Default     |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `filterpanelOpen` | `filterpanel-open`  |                                                                                                                                  | `boolean`                                     | `false`     |
| `initialMainSize` | `initial-main-size` | Size of the main content panel when component loads. Changing this attribute afterwards has no effect.  Default size is `large`. | `"large" \| "medium" \| "small" \| undefined` | `undefined` |
| `overlayOpen`     | `overlay-open`      |                                                                                                                                  | `boolean`                                     | `false`     |


## Events

| Event                  | Description | Type                                       |
| ---------------------- | ----------- | ------------------------------------------ |
| `dsoCloseOverlay`      |             | `CustomEvent<KeyboardEvent \| MouseEvent>` |
| `dsoFilterpanelApply`  |             | `CustomEvent<FilterpanelEvent>`            |
| `dsoFilterpanelCancel` |             | `CustomEvent<FilterpanelEvent>`            |
| `dsoMainSizeChange`    |             | `CustomEvent<ViewerGridChangeSizeEvent>`   |


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
