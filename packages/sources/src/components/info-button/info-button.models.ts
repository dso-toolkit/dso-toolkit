export interface InfoButton {
  active?: boolean;
  secondary?: boolean;
  label?: string;
  onClick: (e: MouseEvent) => void;
}
