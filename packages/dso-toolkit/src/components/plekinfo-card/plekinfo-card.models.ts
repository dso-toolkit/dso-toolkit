import { Renvooi } from "../renvooi/renvooi.models.js";
import { Label } from "../label/label.models.js";

export interface PlekinfoCard<TemplateFnReturnType> {
  label: Renvooi | string;
  href: string;
  active?: boolean;
  meta?: Label;
  content?: TemplateFnReturnType;
  symbool: TemplateFnReturnType;
  wijzigactie?: PlekinfoWijzigactie;
  dsoPlekinfoCardClick?: (e: CustomEvent<DsoPlekinfoCardClickEvent>) => void;
}

export interface DsoPlekinfoCardClickEvent {
  originalEvent?: MouseEvent;
}

export type PlekinfoWijzigactie = "voegtoe" | "verwijder";
