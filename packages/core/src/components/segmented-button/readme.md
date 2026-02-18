# dso-segmented-button

Beperk het aantal segmenten, houd labels kort en consistent. Het component kan niet overgaan op een volgende regel. Zorg ervoor dat de opties ook bij mobiele resolutie (320 px) passen op 1 regel of dat de laatste button ook weg mag vallen op de laagste resolutie.

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                    | Type                      | Default |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------- |
| `activeOption` | `active-option` | The index of the currently active option.  Defaults to `-1`, indicating no active option.  Note: This prop can be set externally to any index, including disabled options. However, users cannot click disabled buttons to change the active state themselves. | `number`                  | `-1`    |
| `options`      | --              | The available options for the segmented button.                                                                                                                                                                                                                | `SegmentedButtonOption[]` | `[]`    |


## Events

| Event       | Description                             | Type                                      |
| ----------- | --------------------------------------- | ----------------------------------------- |
| `dsoChange` | Emitted when the active option changes. | `CustomEvent<SegmentedButtonChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
