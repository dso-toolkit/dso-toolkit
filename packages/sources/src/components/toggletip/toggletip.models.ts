import { tooltipPositions } from "../tooltip/tooltip.models";

export interface Toggletip<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  position?: typeof tooltipPositions;
  small?: boolean;
  label?: string;
  secondary?: boolean;
}
