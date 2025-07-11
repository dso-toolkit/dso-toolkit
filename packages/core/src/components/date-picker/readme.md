# `<dso-date-picker>`

<!-- Auto Generated dso-toolkit -->

## Types

### DatePickerBlurEvent

```typescript
export interface DatePickerBlurEvent extends DatePickerChangeEvent {
  originalEvent: FocusEvent;
}
```

<!-- src/components/date-picker/date-picker.interfaces.ts::DatePickerBlurEvent -->

### DatePickerChangeEvent

```typescript
export interface DatePickerChangeEvent {
  component: "dso-date-picker";

  /**
   * The original event that the change event of the `<input type="date">` emitted.
   */
  originalEvent: Event;

  /**
   * The entered date in DD-MM-YYYY.
   *
   * Also set if the entered date is out of bounds, but empty `""` if the date is invalid.
   */
  value: string;

  /**
   * The entered date as Date object.
   *
   * `undefined` if the date is out of bounds or invalid.
   */
  valueAsDate: Date | undefined;

  /**
   * The original validity object. Only for convienience, this object equals `detail.originalEvent.target.validity`.
   */
  validity: ValidityState;

  /**
   * If the input causes an error this property is set:
   *
   * * `required`: If the date is required but no date is given. Equals `validity.valueMissing`.
   * * `min-range`: The entered date is sooner than the minimum date set in `min`. Equals `validity.rangeUnderflow`.
   * * `max-range`: The entered date is later than the maximum date set in `max`. Equals `validity.rangeOverflow`.
   * * `invalid`: If the entered date is invalid. Equals `validity.invalid === false`.
   *
   * For more data on the validity of the input, refer to the property `validity`.
   */
  error?: DatePickerError;
}
```

<!-- src/components/date-picker/date-picker.interfaces.ts::DatePickerChangeEvent -->

### DatePickerFocusEvent

```typescript
export interface DatePickerFocusEvent {
  originalEvent: FocusEvent;
  component: "dso-date-picker";
}
```

<!-- src/components/date-picker/date-picker.interfaces.ts::DatePickerFocusEvent -->

### DatePickerKeyboardEvent

```typescript
export interface DatePickerKeyboardEvent {
  originalEvent: KeyboardEvent;
  component: "dso-date-picker";
}
```

<!-- src/components/date-picker/date-picker.interfaces.ts::DatePickerKeyboardEvent -->

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

---

_Built with [StencilJS](https://stenciljs.com/)_
