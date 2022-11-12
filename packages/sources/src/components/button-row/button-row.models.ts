import { Anchor } from "../anchor/anchor.models";
import { Button } from "../button/button.models";

export interface ButtonRow {
  buttons: (Anchor | Button)[];
}
