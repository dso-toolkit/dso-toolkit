import { Renvooi } from "../renvooi/renvooi.models.js";
import { Label } from "../label/label.models.js";

export interface PlekinfoCard<TemplateFnReturnType> {
  label: Renvooi | string;
  href: string;
  active?: boolean;
  meta?: Label;
  content?: TemplateFnReturnType;
  symbool?: TemplateFnReturnType;
  wijzigactie?: PlekinfoWijzigactie;
  dsoPlekinfoCardClick?: (e: CustomEvent<PlekinfoCardClickEvent>) => void;
}

export interface PlekinfoCardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export type PlekinfoWijzigactie = "voegtoe" | "verwijder";
