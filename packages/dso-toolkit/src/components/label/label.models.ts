export interface Label {
  status?: "primary" | "info" | "success" | "warning" | "danger" | "error" | "bright" | "attention";
  compact?: boolean;
  truncate?: boolean;
  label: string;
  removable?: boolean;
  dsoRemoveClick?: (e: CustomEvent<MouseEvent>) => void;
  symbol?: string;
}
