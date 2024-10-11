import { Label } from "../label/label.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";

export interface DocumentCard<TemplateFnReturnType> {
  label: string;
  href: string;
  active?: boolean;
  meta?: Label;
  typeAuthority: TemplateFnReturnType;
  typeToelichting: Toggletip<never>;
  status: string;
  dsoDocumentCardClick?: (e: CustomEvent<DocumentCardClickEvent>) => void;
}

export interface DocumentCardClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
