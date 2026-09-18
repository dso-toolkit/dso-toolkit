import { isObject } from "../../shared/is-object";
import { Label } from "../label/label.models";
import { Renvooi } from "../renvooi/renvooi.models";
import { SlideToggle } from "../slide-toggle/slide-toggle.models";

export interface PlekinfoCard<TemplateFnReturnType> {
  label: Renvooi | string;
  href: string;
  targetBlank: boolean;
  active?: boolean;
  meta?: Label;
  content?: TemplateFnReturnType;
  items?: PlekinfoCardItem<TemplateFnReturnType>[];
  showStroke?: boolean;
  symbool?: TemplateFnReturnType;
  wijzigactie?: PlekinfoWijzigactie;
  interaction?: SlideToggle;
  dsoPlekinfoCardClick?: (e: CustomEvent<PlekinfoCardClickEvent>) => void;
}

export interface PlekinfoCardItem<TemplateFnReturnType> {
  label: Renvooi | string;
  sublabel?: Renvooi | string;
  symbool: TemplateFnReturnType;
  meta?: Label;
  wijzigactie?: PlekinfoWijzigactie;
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
