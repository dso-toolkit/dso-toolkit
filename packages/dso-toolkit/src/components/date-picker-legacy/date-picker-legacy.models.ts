export interface DatePickerLegacy {
  id?: string;
  dsoDateChange?: (e: CustomEvent) => void;
  direction?: "left" | "right";
  value?: string;
  min?: string;
  max?: string;
  disabled: boolean;
  autofocus?: boolean;
  invalid?: boolean;
  describedBy?: string;
}
