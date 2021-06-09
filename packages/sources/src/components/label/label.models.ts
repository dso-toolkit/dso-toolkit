export interface Label {
  status?: string;
  compact?: boolean;
  label: string;
  button?: {
    title: string;
    icon: string;
    onClick: unknown;
  };
}
