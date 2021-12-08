import { Selectable } from '../..';
import { Button } from "../button/button.models";

export interface Card<TemplateFnReturnType> {
  label: string;
  selectable?: Selectable<TemplateFnReturnType>;
  content: string;
  interactions?: Button[];
}
