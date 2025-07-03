# `<dso-toggletip>`

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                        | Type                                                                                                | Default         |
| ------------- | -------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------- |
| `badgeStatus` | `badge-status` | The badge status when `mode="badge"`               | `"attention" \| "error" \| "info" \| "outline" \| "primary" \| "success" \| "warning" \| undefined` | `undefined`     |
| `icon`        | `icon`         | The icon when `mode="icon"`                        | `string \| undefined`                                                                               | `undefined`     |
| `iconActive`  | `icon-active`  | The icon when `mode="icon"` and the tip is visible | `string \| undefined`                                                                               | `undefined`     |
| `label`       | `label`        | Toggletip label.                                   | `string`                                                                                            | `"Toelichting"` |
| `mode`        | `mode`         | The type of Toggletip.                             | `"badge" \| "icon" \| "secondary" \| "toggle"`                                                      | `"toggle"`      |
| `position`    | `position`     | Toggletip position.                                | `"bottom" \| "left" \| "right" \| "top"`                                                            | `"right"`       |
| `small`       | `small`        | Set to true for small Toggletip.                   | `boolean`                                                                                           | `false`         |


## Dependencies

### Used by

 - [dso-legend-item](../legend-item)

### Depends on

- [dso-info-button](../info-button)
- [dso-badge](../badge)
- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-toggletip --> dso-info-button
  dso-toggletip --> dso-tooltip
  dso-info-button --> dso-icon-button
  dso-toggletip --> dso-badge
  dso-toggletip --> dso-icon
  dso-info-button --> dso-icon
  dso-icon-button --> dso-icon
  dso-legend-item --> dso-toggletip
  style dso-toggletip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
