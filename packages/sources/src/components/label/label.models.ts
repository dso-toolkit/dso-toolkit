export interface Label {
  status?: string;
  compact?: boolean;
  truncate?: boolean;
  label: string;
  button?: {
    title: string;
    icon: string;
    onClick: unknown;
  };
  symbol?: string;
}
