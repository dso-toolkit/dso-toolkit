import { Placement } from "@floating-ui/dom";
import { HandlerFunction } from "storybook/actions";

export interface IconButton {
  variant?: "secondary" | "tertiary" | "tertiary-on-color" | "map";
  icon: string;
  accessibleLabel: string;
  tooltipPlacement: Placement;
  dsoClickIconButton: HandlerFunction;
}
