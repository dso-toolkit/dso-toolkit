import { HandlerFunction } from "storybook/actions";

import { IconAlias } from "../icon";

export type IconButtonVariant = "secondary" | "tertiary" | "map";

export type IconButtonTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface IconButton {
  variant: IconButtonVariant;
  icon: IconAlias;
  label: string;
  tooltipPlacement?: IconButtonTooltipPlacement;
  disabled?: boolean;
  dsoClick?: HandlerFunction;
}
