export interface DatePicker {
  id?: string;
  dsoDateChange?: (e: CustomEvent) => void;
  dsoBlur?: (e: CustomEvent) => void;
  dsoKeyUp?: (e: CustomEvent) => void;
  dsoKeyDown?: (e: CustomEvent) => void;
  dsoFocus?: (e: CustomEvent) => void;
  value?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  autofocus?: boolean;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
}
