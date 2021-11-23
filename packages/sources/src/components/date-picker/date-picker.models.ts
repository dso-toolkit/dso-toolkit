export interface DatePicker {
  id?: string;
  onDateChange: (e: CustomEvent) => void;
  value?: string;
  min?: number;
  max?: number;
  disabled: boolean;
  autofocus?: boolean;
}
