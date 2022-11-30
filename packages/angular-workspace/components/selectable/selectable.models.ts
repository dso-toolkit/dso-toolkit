export interface SelectableVariables {
  type: string;
  identifier: string;
  label: string;
  value: string;
  name?: string;
  describedById?: string;
  invalid?: string | boolean;
  disabled?: string | boolean;
  required?: string | boolean;
  checked?: string | boolean;
  indeterminate?: string | boolean;
  infoContent?: string;
  infoFixed?: string | boolean;
  slot?: string;
  dsoChange?: string;
}
