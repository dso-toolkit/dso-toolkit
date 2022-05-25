export const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;

export interface Tooltip {
  active?: boolean;
  descriptive?: boolean;
  position: typeof tooltipPositions;
  label: string;
  id?: string;
}
