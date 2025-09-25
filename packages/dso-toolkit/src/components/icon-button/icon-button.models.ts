import { TooltipPlacement } from "@dso-toolkit/core/src";
import { HandlerFunction } from "storybook/actions";

export type IconButtonVariant = "secondary" | "tertiary" | "map";

export interface IconButton {
  variant: IconButtonVariant;
  icon: string;
  label: string;
  tooltipPlacement?: TooltipPlacement;
  disabled?: boolean;
  dsoClick?: HandlerFunction;
}
