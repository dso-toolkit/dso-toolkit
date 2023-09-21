export interface DatePicker {
  id?: string;
  dsoDateChange?: (e: CustomEvent) => void;
  value?: string;
  min?: string;
  max?: string;
  disabled: boolean;
  autofocus?: boolean;
  invalid?: boolean;
  describedBy?: string;
}
