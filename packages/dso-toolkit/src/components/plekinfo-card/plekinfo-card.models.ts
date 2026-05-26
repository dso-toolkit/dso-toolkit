import { isObject } from "../../utils/is-object";
import { Label } from "../label";
import { Renvooi } from "../renvooi";
import { SlideToggle } from "../slide-toggle";

export interface PlekinfoCard<TemplateFnReturnType> {
  label: Renvooi | string;
  href: string;
  targetBlank: boolean;
  active?: boolean;
  meta?: Label;
  content?: TemplateFnReturnType;
  symbool?: TemplateFnReturnType;
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

export function isPlekinfoCardInterface<TemplateFnReturnType>(
  object: unknown,
): object is PlekinfoCard<TemplateFnReturnType> {
  return isObject(object) && "targetBlank" in object;
}
