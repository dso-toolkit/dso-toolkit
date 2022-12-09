import { Anchor } from "../anchor/anchor.models.js";
import { Button } from "../button/button.models.js";

export interface ButtonRow {
  buttons: (Anchor | Button)[];
}
