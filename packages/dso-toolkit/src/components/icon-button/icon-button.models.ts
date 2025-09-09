import { Placement } from "@floating-ui/dom";
import { HandlerFunction } from "storybook/actions";

export type IconButtonVariant = "secondary" | "tertiary" | "map";

export interface IconButton {
  variant: IconButtonVariant;
  icon: string;
  accessibleLabel: string;
  tooltipPlacement: Placement;
  dsoIconButtonClick: HandlerFunction;
}
