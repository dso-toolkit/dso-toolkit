export interface DatePickerChangeEvent {
  originalEvent: Event;
  component: "dso-date-picker";
  valueAsDate: Date | undefined;
  value: string;
  error?: "invalid" | "required" | "min-range" | "max-range";
}

export interface DatePickerFocusEvent {
  originalEvent: FocusEvent;
  component: "dso-date-picker";
}

export interface DatePickerKeyboardEvent {
  originalEvent: KeyboardEvent;
  component: "dso-date-picker";
}
