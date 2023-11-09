export type DsoDatePickerLegacyChangeEvent = {
  component: "dso-date-picker-legacy";
  valueAsDate: Date | undefined;
  value: string;
  error?: "invalid" | "required" | "min-range" | "max-range";
};

export type DsoDatePickerLegacyFocusEvent = {
  component: "dso-date-picker-legacy";
};

export type DsoDatePickerLegacyKeyboardEvent = {
  component: "dso-date-picker-legacy";
  originalEvent: KeyboardEvent;
};

export type DsoDatePickerLegacyDirection = "left" | "right";
