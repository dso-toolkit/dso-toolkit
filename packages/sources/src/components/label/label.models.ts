export interface Label {
  status?: string;
  compact?: boolean;
  truncate?: boolean;
  label: string;
  removable?: boolean;
  onRemoveLabel?: (e: MouseEvent) => void;
  symbol?: string;
}
