import { Link } from "../link/link.models.js";
import { Button } from "../button/button.models.js";

export interface ButtonRow {
  buttons: (Link | Button)[];
  emphasized?: boolean;
  align?: ButtonRowAlign;
  noWrap?: boolean;
}

export type ButtonRowAlign = "center" | "right";
