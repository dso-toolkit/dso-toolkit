# `<dso-date-picker>`

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                               | Type                   | Default      |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------ |
| `describedBy`  | `described-by`  | ID of element that describes the input element                                                                                                                            | `string \| undefined`  | `undefined`  |
| `disabled`     | `disabled`      | Makes the date picker input component disabled. This prevents users from being able to interact with the input, and conveys its inactive state to assistive technologies. | `boolean`              | `false`      |
| `dsoAutofocus` | `dso-autofocus` | Should the input be focused on load?                                                                                                                                      | `boolean`              | `false`      |
| `identifier`   | `identifier`    | Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.                                                                              | `string \| undefined`  | `undefined`  |
| `invalid`      | `invalid`       | Is input invalid?                                                                                                                                                         | `boolean \| undefined` | `undefined`  |
| `max`          | `max`           | Maximum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY. This setting can be used alone or together with the min property.                            | `string \| undefined`  | `undefined`  |
| `min`          | `min`           | Minimum date allowed to be picked. Must be in Dutch date format: DD-MM-YYYY. This setting can be used alone or together with the max property.                            | `string \| undefined`  | `undefined`  |
| `name`         | `name`          | Name of the date picker input.                                                                                                                                            | `string`               | `"dso-date"` |
| `required`     | `required`      | Should the input be marked as required?                                                                                                                                   | `boolean`              | `false`      |
| `value`        | `value`         | Date value. Must be in Dutch date format: DD-MM-YYYY.                                                                                                                     | `string`               | `""`         |


## Events

| Event           | Description                                         | Type                                   |
| --------------- | --------------------------------------------------- | -------------------------------------- |
| `dsoBlur`       | Event emitted the date picker input is blurred.     | `CustomEvent<DatePickerBlurEvent>`     |
| `dsoDateChange` | Event emitted when a date is selected.              | `CustomEvent<DatePickerChangeEvent>`   |
| `dsoFocus`      | Event emitted the date picker input is focused.     | `CustomEvent<DatePickerFocusEvent>`    |
| `dsoKeyDown`    | Event emitted on key down in the date picker input. | `CustomEvent<DatePickerKeyboardEvent>` |
| `dsoKeyUp`      | Event emitted on key up in the date picker input.   | `CustomEvent<DatePickerKeyboardEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
