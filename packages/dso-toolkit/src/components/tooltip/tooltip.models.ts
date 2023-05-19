export const tooltipPositions = ["top", "right", "bottom", "left"] as const;

export const tooltipStrategy = ["auto", "absolute", "fixed"] as const;

export interface Tooltip {
  active?: boolean;
  descriptive?: boolean;
  position: (typeof tooltipPositions)[number];
  strategy?: (typeof tooltipStrategy)[number];
  label: string;
  id?: string;
}
