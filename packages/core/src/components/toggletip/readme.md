# `<dso-toggletip>`

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                          | Type                                                                                                                                                                                                         | Default         |
| ----------- | ----------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `label`     | `label`     | Toggletip label.                     | `string`                                                                                                                                                                                                     | `"Toelichting"` |
| `position`  | `position`  | Toggletip position.                  | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `"right"`       |
| `secondary` | `secondary` | Set to true for secondary Toggletip. | `boolean \| undefined`                                                                                                                                                                                       | `undefined`     |
| `small`     | `small`     | Set to true for small Toggletip.     | `boolean \| undefined`                                                                                                                                                                                       | `undefined`     |


## Dependencies

### Depends on

- [dso-info-button](../info-button)
- [dso-tooltip](../tooltip)

### Graph
```mermaid
graph TD;
  dso-toggletip --> dso-info-button
  dso-toggletip --> dso-tooltip
  dso-info-button --> dso-icon-button
  dso-info-button --> dso-icon
  dso-info-button --> dso-scrollable
  dso-icon-button --> dso-icon
  style dso-toggletip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
