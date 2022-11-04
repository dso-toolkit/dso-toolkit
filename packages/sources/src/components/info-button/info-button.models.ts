export interface InfoButton {
  active?: boolean;
  secondary?: boolean;
  label?: string;
  dsoToggle?: (e: MouseEvent) => void;
}
