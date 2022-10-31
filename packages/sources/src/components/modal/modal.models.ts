import { Button } from "../button/button.models";

export interface Modal<TemplateFnReturnType> {
  id?: string;
  heading?: string;
  role: "alert" | "dialog";
  body: TemplateFnReturnType | string;
  buttons?: Button[];
  confirm?: boolean;
}
