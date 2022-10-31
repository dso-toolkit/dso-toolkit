# `<dso-tooltip>`



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                       | Type                                     | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `active`      | `active`      | Whether or not to show the tooltip. To control the tooltip add the `active` attribute or use the `activate()` and `deactivate()` instance methods.                                                                                                                                                | `boolean`                                | `false`     |
| `descriptive` | `descriptive` | Defines if the tooltip is descriptive. A descriptive tooltip contains a meaningful message. Tooltips that are not descriptive are hidden from screenreaders using `aria-hidden`.                                                                                                                  | `boolean`                                | `false`     |
| `for`         | `for`         | Specify target element that the tooltip will describe and listens to for events. * `undefined`: The direct parent is used. * `string`: The element is located using `document.getElementById()` * `HTMLElement`: Pass the target element directly If the element is not found an Error is thrown. | `HTMLElement \| string \| undefined`     | `undefined` |
| `noArrow`     | `no-arrow`    | Set attribute `no-arrow` to hide the arrow                                                                                                                                                                                                                                                        | `boolean`                                | `false`     |
| `position`    | `position`    | Set position of tooltip relative to target                                                                                                                                                                                                                                                        | `"bottom" \| "left" \| "right" \| "top"` | `"top"`     |
| `small`       | `small`       | Defines if the tooltip has a smaller max-width                                                                                                                                                                                                                                                    | `boolean \| undefined`                   | `undefined` |
| `stateless`   | `stateless`   | Deactivates mouseover behaviour                                                                                                                                                                                                                                                                   | `boolean \| undefined`                   | `undefined` |
| `strategy`    | `strategy`    | Set position strategy of tooltip                                                                                                                                                                                                                                                                  | `"absolute" \| "auto" \| "fixed"`        | `"auto"`    |


## Methods

### `activate() => Promise<void>`

Activate the tooltip (Sets the `active` attribute)

#### Returns

Type: `Promise<void>`



### `deactivate() => Promise<void>`

Deactivate the tooltip (Removes the `active` attribute)

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dso-label](../label)
 - [dso-toggletip](../toggletip)

### Graph
```mermaid
graph TD;
  dso-label --> dso-tooltip
  dso-toggletip --> dso-tooltip
  style dso-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
