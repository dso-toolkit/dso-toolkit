import { Selectable } from "../..";
import { Button } from "../button/button.models";

export interface Card<TemplateFnReturnType> {
  label: string;
  selectable?: Selectable<TemplateFnReturnType>;
  content: TemplateFnReturnType;
  interactions?: Button[];
  image?: string;
}
