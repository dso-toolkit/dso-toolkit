export interface Label {
  status?: string;
  compact?: boolean;
  truncate?: boolean;
  label: string;
  removable?: boolean;
  dsoRemoveClick?: (e: MouseEvent) => void;
  symbol?: string;
}
