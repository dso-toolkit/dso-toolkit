import { TemplateResult } from "lit-html";

import { isObject } from "../../shared/is-object.js";
import { Button } from "../button/button.models.js";
import { InfoButton } from "../info-button/info-button.models.js";
import { Label } from "../label/label.models.js";
import { Link } from "../link/link.models.js";
import { Selectable } from "../selectable/selectable.models.js";
import { SlideToggle } from "../slide-toggle/slide-toggle.models.js";

export interface Card {
  label: string;
  href: string;
  active?: boolean;
  mode?: Link["mode"];
  selectable?: Selectable;
  content?: TemplateResult | string;
  interactions?: Array<Button | Label | InfoButton | SlideToggle>;
  dsoCardClick?: (e: CustomEvent<CardClickEvent>) => void;
}

export interface CardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export function isCardInterface(object: unknown): object is Card {
  return isObject(object) && !("targetBlank" in object) && !("status" in object);
}
