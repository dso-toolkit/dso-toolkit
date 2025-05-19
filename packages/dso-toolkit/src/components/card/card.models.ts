import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Link } from "../link/link.models.js";
import { Selectable } from "../selectable/selectable.models.js";
import { SlideToggle } from "../slide-toggle";
import { Toggletip } from "../toggletip/toggletip.models.js";

export interface Card<TemplateFnReturnType> {
  label: string;
  href: string;
  active?: boolean;
  mode?: Link["mode"];
  selectable?: Selectable<TemplateFnReturnType>;
  content?: TemplateFnReturnType;
  interactions?: Array<Button | Label | Toggletip<TemplateFnReturnType> | SlideToggle>;
  dsoCardClick?: (e: CustomEvent<CardClickEvent>) => void;
}

export interface CardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
