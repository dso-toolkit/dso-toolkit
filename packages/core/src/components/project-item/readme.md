# `<dso-project-item>`



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                    | Type                  | Default     |
| -------- | --------- | ------------------------------ | --------------------- | ----------- |
| `label`  | `label`   | The label of the project item. | `string \| undefined` | `undefined` |


## Dependencies

### Depends on

- [dso-label](../label)

### Graph
```mermaid
graph TD;
  dso-project-item --> dso-label
  dso-label --> dso-icon-button
  dso-label --> dso-tooltip
  dso-icon-button --> dso-icon
  style dso-project-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
