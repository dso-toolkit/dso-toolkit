# dso-plekinfo-card-item



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                      | Type                                    | Default     |
| ------------- | ------------- | -------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `active`      | `active`      | Makes the PlekinfoCardItem active, giving it a persistent background color.      | `boolean \| undefined`                  | `undefined` |
| `wijzigactie` | `wijzigactie` | An optional 'wijzigactie' that signals if the plekinfo item is added or removed. | `"verwijder" \| "voegtoe" \| undefined` | `undefined` |


## Events

| Event                      | Description                                                                              | Type                |
| -------------------------- | ---------------------------------------------------------------------------------------- | ------------------- |
| `dsoPlekinfoCardItemFocus` | Emitted when the item, or any of its slotted content, receives focus.                    | `CustomEvent<void>` |
| `dsoPlekinfoCardItemHover` | Emitted when the user hovers the item, similar to `dso-map-layer-object`'s mouse events. | `CustomEvent<void>` |


## Slots

| Slot         | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| `"label"`    | The label of the plekinfo item.                                        |
| `"meta"`     | An optional label badge displayed after the label and sublabel.        |
| `"sublabel"` | An optional sublabel of the plekinfo item.                             |
| `"symbol"`   | An optional slot to place a symbol in, representing the plekinfo item. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
