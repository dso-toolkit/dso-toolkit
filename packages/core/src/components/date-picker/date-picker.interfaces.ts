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

export interface DatePickerFocusEvent {
  originalEvent: FocusEvent;
  component: "dso-date-picker";
}

export interface DatePickerBlurEvent extends DatePickerChangeEvent {
  originalEvent: FocusEvent;
}

export interface DatePickerKeyboardEvent {
  originalEvent: KeyboardEvent;
  component: "dso-date-picker";
}

export type DatePickerError = "required" | "min-range" | "max-range" | "invalid";
