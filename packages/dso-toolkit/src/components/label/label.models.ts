export interface Label {
  status?: "primary" | "info" | "success" | "warning" | "danger" | "error" | "bright" | "attention";
  compact?: boolean;
  truncate?: boolean;
  label: string;
  removable?: boolean;
  dsoRemoveClick?: (e: CustomEvent<MouseEvent>) => void;
  symbol?: string;
}

export function isLabelInterface(object: unknown): object is Label {
  return "compact" in (object as Label);
}
