export interface DatePicker {
  id?: string;
  dsoDateChange?: (e: CustomEvent) => void;
  direction?: string;
  value?: string;
  min?: string;
  max?: string;
  disabled: boolean;
  autofocus?: boolean;
}
