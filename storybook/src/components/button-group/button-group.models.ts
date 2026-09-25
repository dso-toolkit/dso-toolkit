import { Button, ButtonAnchor } from "../button/button.models.js";
import { IconButton } from "../icon-button/icon-button.models.js";

export interface ButtonGroup {
  direction?: ButtonGroupDirection;
  buttons: Array<Button | ButtonAnchor | IconButton>;
}

export type ButtonGroupDirection = "row" | "column";
