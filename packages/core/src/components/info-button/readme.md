# `<dso-info-button>`

Het gedrag van de Info Button is afhankelijk van het gebruik van het toggletip-slot:

- Bij een klik emit de `Info Button` het `dsoToggle` event, zolang het `slot name="toggletip"` **niet** is gevuld.
- Indien het `slot name="toggletip"` **wél** is gevuld, verzorgt `Info Button` de Toggletip functionaliteit en 
  wordt er geen `dsoToggle` event meer ge-emit.

## Toegankelijkheid

De toggletip is volledig met het toetsenbord te bedienen:

- `Enter` of klik opent de toggletip
- `Escape` sluit de toggletip
- Focus buiten het component sluit de toggletip

Daarnaast wordt aria-expanded correct bijgewerkt, zodat screenreaders de actuele status kunnen aankondigen.

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                              | Type                                     | Default                   |
| -------------------- | --------------------- | ---------------------------------------- | ---------------------------------------- | ------------------------- |
| `active`             | `active`              | Whether the InfoButton is active.        | `boolean`                                | `false`                   |
| `label`              | `label`               | The label.                               | `string`                                 | `"Toelichting bij optie"` |
| `secondary`          | `secondary`           | For secondary Info Button.               | `boolean \| undefined`                   | `undefined`               |
| `toggletipPlacement` | `toggletip-placement` | The placement of the Toggletip on click. | `"bottom" \| "left" \| "right" \| "top"` | `"top"`                   |


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

 - [dso-legend-item](../legend/legend-item)
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
  dso-legend-item --> dso-info-button
  dso-selectable --> dso-info-button
  dso-toggletip --> dso-info-button
  style dso-info-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
