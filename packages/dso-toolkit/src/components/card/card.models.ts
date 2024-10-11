import { Anchor } from "../anchor/anchor.models.js";
import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Selectable } from "../selectable/selectable.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";
import { SlideToggle } from "../slide-toggle";

export interface Card<TemplateFnReturnType> {
  label: string;
  href: string;
  active?: boolean;
  mode?: Anchor["mode"];
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
