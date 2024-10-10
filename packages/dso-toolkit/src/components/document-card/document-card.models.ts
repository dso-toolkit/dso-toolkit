import { Label } from "../label/label.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";

export interface DocumentCard {
  label: string;
  href: string;
  active?: boolean;
  meta?: Label;
  type: string;
  typeToelichting: Toggletip<never>;
  status: string;
  dsoDocumentCardClick: (e: CustomEvent<DocumentCardClickEvent>) => void;
}

export interface DocumentCardClickEvent {
  originalEvent: MouseEvent;
}
