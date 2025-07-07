# `<dso-input-range>`

<!-- Auto Generated dso-toolkit -->

## Types

### InputRangeChangeEvent

```typescript
export interface InputRangeChangeEvent {
  originalEvent: Event;
  value: number | undefined;
  min: number;
  max: number;
  step: number;
}
```

<!-- src/components/input-range/input-range.interfaces.ts::InputRangeChangeEvent -->

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

---

_Built with [StencilJS](https://stenciljs.com/)_
