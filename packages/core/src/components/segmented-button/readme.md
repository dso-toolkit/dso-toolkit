# dso-segmented-button

- Beperk het aantal segmenten, houd labels kort en consistent. Het component kan niet overgaan op een volgende regel. Zorg ervoor dat de opties ook bij mobiele resolutie (320 px) passen op 1 regel of dat de laatste button ook weg mag vallen op de laagste resolutie.

- Alleen één knop kan tegelijk actief zijn.
- Uitgeschakelde opties in de segmented button kunnen niet door de gebruiker geactiveerd worden.


<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                                                    | Type                      | Default     |
| ----------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| `activeOption`          | `active-option`           | The index of the currently active option. Defaults to -1 (no active option).                                   | `number`                  | `-1`        |
| `options`               | --                        | The available options for the segmented button.                                                                | `SegmentedButtonOption[]` | `[]`        |
| `segmentedAriaLabel`    | `segmented-aria-label`    | Literal accessible label for the radio group (aria-label). If not set, defaults to 'Segmented button options'. | `string \| undefined`     | `undefined` |
| `segmentedAriaRequired` | `segmented-aria-required` | Whether selection is required (adds aria-required to the group).                                               | `boolean \| undefined`    | `undefined` |


## Events

| Event       | Description                             | Type                                      |
| ----------- | --------------------------------------- | ----------------------------------------- |
| `dsoChange` | Emitted when the active option changes. | `CustomEvent<SegmentedButtonChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
