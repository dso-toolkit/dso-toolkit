# `<dso-input-range>`



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                         | Type                  | Default     |
| ------------- | ------------- | ----------------------------------- | --------------------- | ----------- |
| `description` | `description` | The description of the range.       | `string \| undefined` | `undefined` |
| `label`       | `label`       | The label of the range.             | `string \| undefined` | `undefined` |
| `max`         | `max`         | The maximum value of the range.     | `number \| undefined` | `undefined` |
| `min`         | `min`         | The minimum value of the range.     | `number \| undefined` | `undefined` |
| `step`        | `step`        | The step to increment the value by. | `number \| undefined` | `undefined` |
| `unit`        | `unit`        | The unit of the range.              | `string`              | `""`        |
| `value`       | `value`       | The value of the range.             | `number \| undefined` | `undefined` |


## Events

| Event       | Description                         | Type                                 |
| ----------- | ----------------------------------- | ------------------------------------ |
| `dsoChange` | Emitted when the value has changed. | `CustomEvent<InputRangeChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
