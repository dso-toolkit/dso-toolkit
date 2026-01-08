import { Button, ButtonAnchor } from "../button/button.models";
import { IconButton } from "../icon-button";

export interface ButtonGroup {
  direction?: ButtonGroupDirection;
  buttons: Button[] | ButtonAnchor[] | IconButton[];
}

export type ButtonGroupDirection = "row" | "column";
