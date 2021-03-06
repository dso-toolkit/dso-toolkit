# dso-tooltip



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                                                                                                       | Type                                     | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `active`   | `active`   | Whether or not to show the tooltip. To control the tooltip add the `active` attribute or use the `activate()` and `deactivate()` instance methods.                                                                                                                                                | `boolean`                                | `false`     |
| `for`      | `for`      | Specify target element that the tooltip will describe and listens to for events. * `undefined`: The direct parent is used. * `string`: The element is located using `document.getElementById()` * `HTMLElement`: Pass the target element directly If the element is not found an Error is thrown. | `HTMLElement \| string \| undefined`     | `undefined` |
| `noArrow`  | `no-arrow` | Set attribute `no-arrow` to hide the arrow                                                                                                                                                                                                                                                        | `boolean`                                | `false`     |
| `position` | `position` | Set position of tooltip relative to target                                                                                                                                                                                                                                                        | `"bottom" \| "left" \| "right" \| "top"` | `'top'`     |


## Methods

### `activate() => Promise<void>`

Activate the tooltip (Sets the `active` attribute)

#### Returns

Type: `Promise<void>`



### `deactivate() => Promise<void>`

Deactivate the tooltip (Removes the `active` attribute)

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
