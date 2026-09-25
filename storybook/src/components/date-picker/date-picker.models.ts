import {
  DatePickerBlurEvent,
  DatePickerChangeEvent,
  DatePickerFocusEvent,
  DatePickerKeyboardEvent,
} from "@dso-toolkit/core";

export interface DatePicker {
  id?: string;
  dsoDateChange?: (e: CustomEvent<DatePickerChangeEvent>) => void;
  dsoBlur?: (e: CustomEvent<DatePickerBlurEvent>) => void;
  dsoKeyUp?: (e: CustomEvent<DatePickerKeyboardEvent>) => void;
  dsoKeyDown?: (e: CustomEvent<DatePickerKeyboardEvent>) => void;
  dsoFocus?: (e: CustomEvent<DatePickerFocusEvent>) => void;
  value?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  autofocus?: boolean;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
}
