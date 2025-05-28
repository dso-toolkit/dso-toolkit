import { Button } from "../button/button.models.js";
import { Link } from "../link/link.models.js";

export interface ButtonRow {
  buttons: (Link | Button)[];
  emphasized?: boolean;
  align?: ButtonRowAlign;
  noWrap?: boolean;
}

export type ButtonRowAlign = "center" | "right";
