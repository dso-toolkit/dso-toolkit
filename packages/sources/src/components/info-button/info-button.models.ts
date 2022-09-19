export interface InfoButton {
  active?: boolean;
  secondary?: boolean;
  label?: string;
  onToggle: (e: MouseEvent) => void;
}
