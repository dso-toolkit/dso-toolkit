import { TemplateResult } from "lit-html";

import { isObject } from "../../shared/is-object.js";
import { Badge } from "../badge/badge.models.js";
import { InfoButton } from "../info-button/info-button.models.js";
import { Label } from "../label/label.models.js";

export interface DocumentCard {
  label: string;
  href: string;
  active?: boolean;
  meta?: Label;
  typeItems: (TemplateResult | string)[];
  typeToelichting?: InfoButton;
  status: string;
  statusToelichtingOutline?: Badge;
  statusToelichtingWarning?: Badge;
  labels?: Label[];
  dsoDocumentCardClick?: (e: CustomEvent<DocumentCardClickEvent>) => void;
}

export interface DocumentCardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export function isDocumentCardInterface(object: unknown): object is DocumentCard {
  return isObject(object) && "status" in object;
}
