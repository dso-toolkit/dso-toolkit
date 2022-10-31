# `<dso-toggletip>`

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                     | Default         |
| ----------- | ----------- | ----------- | ---------------------------------------- | --------------- |
| `label`     | `label`     |             | `string`                                 | `"Toelichting"` |
| `position`  | `position`  |             | `"bottom" \| "left" \| "right" \| "top"` | `"right"`       |
| `secondary` | `secondary` |             | `boolean \| undefined`                   | `undefined`     |
| `small`     | `small`     |             | `boolean \| undefined`                   | `undefined`     |


## Dependencies

### Depends on

- [dso-info-button](../info-button)
- [dso-tooltip](../tooltip)

### Graph
```mermaid
graph TD;
  dso-toggletip --> dso-info-button
  dso-toggletip --> dso-tooltip
  dso-info-button --> dso-icon
  style dso-toggletip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
