import { TemplateResult } from "lit-html";

import { isObject } from "../../shared/is-object.js";
import { Label } from "../label/label.models.js";
import { Renvooi } from "../renvooi/renvooi.models.js";
import { SlideToggle } from "../slide-toggle/slide-toggle.models.js";

export interface PlekinfoCard {
  label: Renvooi | string;
  href: string;
  targetBlank: boolean;
  active?: boolean;
  meta?: Label;
  content?: TemplateResult | string;
  symbool?: TemplateResult | string;
  wijzigactie?: PlekinfoWijzigactie;
  interaction?: SlideToggle;
  dsoPlekinfoCardClick?: (e: CustomEvent<PlekinfoCardClickEvent>) => void;
}

export interface PlekinfoCardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export type PlekinfoWijzigactie = "voegtoe" | "verwijder";

export function isPlekinfoCardInterface(object: unknown): object is PlekinfoCard {
  return isObject(object) && "targetBlank" in object;
}
