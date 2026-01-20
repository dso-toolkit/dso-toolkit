# `<dso-info-button>`



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                               | Type                                                                                                                                                                 | Default                   |
| -------------------- | --------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `active`             | `active`              | Whether the InfoButton is active.         | `boolean \| undefined`                                                                                                                                               | `undefined`               |
| `label`              | `label`               | The label.                                | `string`                                                                                                                                                             | `"Toelichting bij optie"` |
| `secondary`          | `secondary`           | For secondary Info Button.                | `boolean \| undefined`                                                                                                                                               | `undefined`               |
| `toggletipPlacement` | `toggletip-placement` | The placement of the Toggle tip on click. | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `"top-start"`             |


## Events

| Event       | Description                                      | Type                                 |
| ----------- | ------------------------------------------------ | ------------------------------------ |
| `dsoToggle` | Emitted when the user activates the Info Button. | `CustomEvent<InfoButtonToggleEvent>` |


## Methods

### `setFocus() => Promise<void>`

To set focus to the toggle button.

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dso-selectable](../selectable)
 - [dso-toggletip](../toggletip)

### Depends on

- [dso-icon-button](../icon-button)
- [dso-icon](../icon)
- [dso-scrollable](../scrollable)

### Graph
```mermaid
graph TD;
  dso-info-button --> dso-icon-button
  dso-info-button --> dso-icon
  dso-info-button --> dso-scrollable
  dso-icon-button --> dso-icon
  dso-icon-button --> dso-scrollable
  dso-selectable --> dso-info-button
  dso-toggletip --> dso-info-button
  style dso-info-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
