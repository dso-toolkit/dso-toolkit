export const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;

export interface Tooltip {
  position: typeof tooltipPositions;
  label: string;
  id?: string;
}
