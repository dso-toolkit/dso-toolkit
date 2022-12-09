import { Button } from "../button/button.models.js";

export interface FormButtons {
  formModifier?: string;
  buttons: Button[];
  asideButtons?: Button[];
}
