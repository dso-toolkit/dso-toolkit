export const tooltipPositions = ["top", "right", "bottom", "left"] as const;

export const tooltipStrategy = ["auto", "absolute", "fixed"] as const;

export interface Tooltip {
  active?: boolean;
  descriptive?: boolean;
  position: typeof tooltipPositions;
  strategy: typeof tooltipStrategy;
  label: string;
  id?: string;
}
