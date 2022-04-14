import { Button } from "../button/button.models";

export interface ButtonRow<TemplateFnReturnType> {
  buttons: Button<TemplateFnReturnType>[];
}
