import { HandlerFunction } from "storybook/actions";

import { isObject } from "../../utils/is-object";
import { IconAlias } from "../icon";

export type IconButtonVariant = "secondary" | "tertiary" | "map";

export type IconButtonTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface IconButton {
  expanded?: boolean;
  variant: IconButtonVariant;
  icon: IconAlias;
  label: string;
  tooltipPlacement?: IconButtonTooltipPlacement;
  disabled?: boolean;
  dsoClick?: HandlerFunction;
  toggled?: boolean;
}

export function isIconButtonInterface(object: unknown): object is IconButton {
  return isObject(object) && "variant" in object && "icon" in object && typeof object.icon === "string";
}
