import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Selectable } from "../selectable/selectable.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";

export type ImageShape = "square" | "rectangle";

export interface Card<TemplateFnReturnType> {
  label: string;
  selectable?: Selectable<TemplateFnReturnType>;
  content: TemplateFnReturnType;
  interactions?: Array<Button | Label | Toggletip<TemplateFnReturnType>>;
  image?: string;
  wideImage?: boolean;
  clickable?: boolean;
  dsoCardClicked?: (e: CustomEvent<DsoCardClickedEvent>) => void;
}

export interface DsoCardClickedEvent {
  originalEvent?: MouseEvent;
}
