import { Button, ButtonAnchor } from "../button/button.models";

export interface ButtonGroup {
  direction?: ButtonGroupDirection;
  buttons: Button[] | ButtonAnchor[];
}

export type ButtonGroupDirection = "row" | "column";
