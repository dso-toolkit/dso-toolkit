export const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;

export interface Tooltip {
  active?: boolean;
  position: typeof tooltipPositions;
  label: string;
  id?: string;
}
