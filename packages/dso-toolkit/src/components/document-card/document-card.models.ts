import { Badge } from "../badge";
import { InfoButton } from "../info-button";
import { Label } from "../label";

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
  dsoDocumentCardClick?: (e: CustomEvent<DocumentCardClickEvent>) => void;
}

export interface DocumentCardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
