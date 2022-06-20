export type DsoDatePickerChangeEvent = {
  component: "dso-date-picker";
  valueAsDate: Date | undefined;
  value: string;
  error?: "invalid" | "required" | "min-range" | "max-range";
};

export type DsoDatePickerFocusEvent = {
  component: "dso-date-picker";
};

export type DsoDatePickerKeyboardEvent = {
  component: "dso-date-picker";
  originalEvent: KeyboardEvent;
};

export type DsoDatePickerDirection = "left" | "right";
