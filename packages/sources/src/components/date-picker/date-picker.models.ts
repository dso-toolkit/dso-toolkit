export interface DatePicker {
  id?: string;
  onDateChange: (e: CustomEvent) => void;
  direction?: string;
  value?: string;
  min?: number;
  max?: number;
  disabled: boolean;
  autofocus?: boolean;
}
