# `<dso-label>`



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                                                                 | Default     |
| ----------- | ----------- | ----------- | ------------------------------------------------------------------------------------ | ----------- |
| `compact`   | `compact`   |             | `boolean \| undefined`                                                               | `undefined` |
| `removable` | `removable` |             | `boolean \| undefined`                                                               | `undefined` |
| `status`    | `status`    |             | `"bright" \| "danger" \| "info" \| "primary" \| "success" \| "warning" \| undefined` | `undefined` |
| `truncate`  | `truncate`  |             | `boolean \| undefined`                                                               | `undefined` |


## Events

| Event            | Description | Type                      |
| ---------------- | ----------- | ------------------------- |
| `dsoRemoveClick` |             | `CustomEvent<MouseEvent>` |


## Dependencies

### Depends on

- [dso-icon](../icon)
- [dso-tooltip](../tooltip)

### Graph
```mermaid
graph TD;
  dso-label --> dso-icon
  dso-label --> dso-tooltip
  style dso-label fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
