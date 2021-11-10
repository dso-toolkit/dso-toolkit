import { tooltipPositions } from "../tooltip/tooltip.models";

export interface Toggletip {
  children: string;
  position?: typeof tooltipPositions;
  small?: boolean;
  label?: string;
}
