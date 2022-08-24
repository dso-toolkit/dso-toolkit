export interface DatePicker {
  id?: string;
  onDateChange?: (e: CustomEvent) => void;
  direction?: string;
  value?: string;
  min?: string;
  max?: string;
  disabled: boolean;
  autofocus?: boolean;
}
