import { Selectable } from "../selectable/selectable.models.js";
import { Button } from "../button/button.models.js";

export interface Card<TemplateFnReturnType> {
  label: string;
  selectable?: Selectable<TemplateFnReturnType>;
  content: TemplateFnReturnType;
  interactions?: Button[];
  image?: string;
  dsoCardClicked?: (e: CustomEvent<DsoCardClickedEvent>) => void;
}

export interface DsoCardClickedEvent {
  originalEvent?: MouseEvent;
}
