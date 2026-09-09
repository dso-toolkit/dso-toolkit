import { TemplateResult } from "lit-html";

import { isObject } from "../../shared/is-object.js";

export type InfoButtonTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface InfoButton {
  active?: boolean;
  toggletipPlacement?: InfoButtonTooltipPlacement;
  label?: string;
  dsoToggle?: (e: CustomEvent<InfoButtonToggleEvent>) => void;
  children?: TemplateResult | string;
}

export interface InfoButtonToggleEvent {
  originalEvent?: MouseEvent;
}

export function isInfoButtonInterface(object: unknown): object is InfoButton {
  return isObject(object) && "toggletipPlacement" in object && "label" in object && "children" in object;
}
