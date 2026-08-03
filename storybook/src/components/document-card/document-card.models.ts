import { isObject } from "../../shared/is-object.js";
import { Badge } from "../badge/badge.models.js";
import { InfoButton } from "../info-button/info-button.models.js";
import { Label } from "../label/label.models.js";

export interface DocumentCard<TemplateFnReturnType> {
  label: string;
  href: string;
  active?: boolean;
  meta?: Label;
  typeItems: TemplateFnReturnType[];
  typeToelichting?: InfoButton<TemplateFnReturnType>;
  status: string;
  statusToelichtingOutline?: Badge<TemplateFnReturnType>;
  statusToelichtingWarning?: Badge<TemplateFnReturnType>;
  labels?: Label[];
  dsoDocumentCardClick?: (e: CustomEvent<DocumentCardClickEvent>) => void;
}

export interface DocumentCardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export function isDocumentCardInterface<TemplateFnReturnType>(
  object: unknown,
): object is DocumentCard<TemplateFnReturnType> {
  return isObject(object) && "status" in object;
}
