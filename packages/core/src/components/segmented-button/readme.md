# dso-segmented-button

- Beperk het aantal segmenten, houd labels kort en consistent. Het component kan niet overgaan op een volgende regel. Zorg ervoor dat de opties ook bij mobiele resolutie (320 px) passen op 1 regel of dat de laatste button ook weg mag vallen op de laagste resolutie.

- Alleen één knop kan tegelijk actief zijn.
- Uitgeschakelde opties in de segmented button kunnen niet door de gebruiker geactiveerd worden.


<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                        | Type                      | Default     |
| ----------------------- | ------------------------- | -------------------------------------------------- | ------------------------- | ----------- |
| `activeOption`          | `active-option`           | Index of the currently active option               | `number \| undefined`     | `undefined` |
| `groupName`             | `group-name`              | Optional custom group name                         | `string \| undefined`     | `undefined` |
| `options`               | --                        | Options to render in the segmented button          | `SegmentedButtonOption[]` | `[]`        |
| `segmentedAriaLabel`    | `segmented-aria-label`    | Accessible label for the radio group               | `string \| undefined`     | `undefined` |
| `segmentedAriaRequired` | `segmented-aria-required` | Whether selection is required (adds aria-required) | `boolean \| undefined`    | `undefined` |


## Events

| Event       | Description                        | Type                                      |
| ----------- | ---------------------------------- | ----------------------------------------- |
| `dsoChange` | Emitted when active option changes | `CustomEvent<SegmentedButtonChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
