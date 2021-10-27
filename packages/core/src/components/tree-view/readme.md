# dso-map-controls



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute | Description | Type                     | Default     |
| ------------------------- | --------- | ----------- | ------------------------ | ----------- |
| `collection` _(required)_ | --        |             | `TreeViewItem<string>[]` | `undefined` |


## Events

| Event       | Description | Type                                  |
| ----------- | ----------- | ------------------------------------- |
| `clickItem` |             | `CustomEvent<TreeViewItem<string>[]>` |
| `closeItem` |             | `CustomEvent<TreeViewItem<string>[]>` |
| `openItem`  |             | `CustomEvent<TreeViewItem<string>[]>` |


## Dependencies

### Depends on

- [dso-icon](../icon)
- [dso-progress-indicator](../progress-indicator)

### Graph
```mermaid
graph TD;
  dso-tree-view --> dso-icon
  dso-tree-view --> dso-progress-indicator
  style dso-tree-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
