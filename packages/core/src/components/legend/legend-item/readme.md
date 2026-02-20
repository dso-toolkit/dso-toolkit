# `<dso-legend-item>`



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                    | Type                   | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------------ | ---------------------- | ----------- |
| `activatable`     | `activatable`      | Controls whether this Legend Item can be active or not                         | `boolean \| undefined` | `undefined` |
| `active`          | `active`           | Controls whether this Legend Item is active or not                             | `boolean \| undefined` | `undefined` |
| `disabled`        | `disabled`         | To disable the Legend Item                                                     | `boolean`              | `false`     |
| `disabledMessage` | `disabled-message` | Message to be shown in an info-button tooltip when the Legend Item is disabled | `string \| undefined`  | `undefined` |


## Events

| Event             | Description                                            | Type                                       |
| ----------------- | ------------------------------------------------------ | ------------------------------------------ |
| `dsoActiveChange` | Emitted when user checks or unchecks the Slide Toggle. | `CustomEvent<LegendItemActiveChangeEvent>` |
| `dsoDelete`       | Emitted when the user clicks the delete button.        | `CustomEvent<LegendItemDeleteEvent>`       |
| `dsoMouseEnter`   | Emitted when the mouse enters the Legend Item          | `CustomEvent<any>`                         |
| `dsoMouseLeave`   | Emitted when the mouse leaves the Legend Item          | `CustomEvent<any>`                         |


## Slots

| Slot        | Description                                                                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"label"`   | The label for this Legend Item. Should be targetted with `<span slot="label">...</span>`                                                                                                                                |
| `"options"` | The slot to place controls in (i.e. `dso-input-range`). If present, this will cause the appearance of an options-button (three dots) to show the controls. Will not be displayed if property `disabled` is set to true. |
| `"symbol"`  | A span where the symbol is styled upon                                                                                                                                                                                  |


## Dependencies

### Depends on

- [dso-icon-button](../../icon-button)
- [dso-slide-toggle](../../slide-toggle)
- [dso-info-button](../../info-button)

### Graph
```mermaid
graph TD;
  dso-legend-item --> dso-icon-button
  dso-legend-item --> dso-slide-toggle
  dso-legend-item --> dso-info-button
  dso-icon-button --> dso-icon
  dso-info-button --> dso-icon-button
  dso-info-button --> dso-icon
  dso-info-button --> dso-scrollable
  style dso-legend-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
