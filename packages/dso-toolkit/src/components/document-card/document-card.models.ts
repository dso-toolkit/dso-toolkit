import { Badge } from "../badge";
import { Label } from "../label";
import { Toggletip } from "../toggletip";

export interface DocumentCard<TemplateFnReturnType> {
  label: string;
  href: string;
  active?: boolean;
  meta?: Label;
  typeItems: TemplateFnReturnType[];
  typeToelichting: Toggletip<never>;
  status: string;
  statusToelichtingOutline?: Badge;
  statusToelichtingWarning?: Badge;
  dsoDocumentCardClick?: (e: CustomEvent<DocumentCardClickEvent>) => void;
}

export interface DocumentCardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
