# `<dso-segmented-button>`

<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute    | Description                               | Type                                   | Default     |
| --------------------------- | ------------ | ----------------------------------------- | -------------------------------------- | ----------- |
| `activeOption` _(required)_ | --           | The currently active option               | `SegmentedButtonOption \| undefined`   | `undefined` |
| `groupName`                 | `group-name` | Optional custom group name                | `string \| undefined`                  | `undefined` |
| `label` _(required)_        | `label`      | Label for the segmented button group.     | `string \| undefined`                  | `undefined` |
| `options` _(required)_      | --           | Options to render in the segmented button | `SegmentedButtonOption[] \| undefined` | `undefined` |
| `required`                  | `required`   | Whether selection is required             | `boolean \| undefined`                 | `undefined` |


## Events

| Event       | Description                        | Type                                      |
| ----------- | ---------------------------------- | ----------------------------------------- |
| `dsoChange` | Emitted when active option changes | `CustomEvent<SegmentedButtonChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
