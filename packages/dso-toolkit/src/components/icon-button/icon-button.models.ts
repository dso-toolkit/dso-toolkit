import { HandlerFunction } from "storybook/actions";

export type IconButtonVariant = "secondary" | "tertiary" | "map";

export type IconButtonTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface IconButton {
  variant: IconButtonVariant;
  icon: string;
  label: string;
  tooltipPlacement?: IconButtonTooltipPlacement;
  disabled?: boolean;
  dsoClick?: HandlerFunction;
}
