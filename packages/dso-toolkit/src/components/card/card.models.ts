import { Anchor } from "../anchor/anchor.models.js";
import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Selectable } from "../selectable/selectable.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";
import { SlideToggle } from "../slide-toggle";

export interface Card<TemplateFnReturnType> {
  label: string;
  href: string;
  mode?: Anchor["mode"];
  selectable?: Selectable<TemplateFnReturnType>;
  content?: TemplateFnReturnType;
  interactions?: Array<Button | Label | Toggletip<TemplateFnReturnType> | SlideToggle>;
  dsoCardClicked?: (e: CustomEvent<DsoCardClickedEvent>) => void;
}

export interface DsoCardClickedEvent {
  originalEvent?: MouseEvent;
}
