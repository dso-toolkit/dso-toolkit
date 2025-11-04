import { DsoOzonContentCustomEvent } from "../../components";
import { OzonContentClickEvent, OzonContentText } from "../ozon-content/ozon-content.interfaces";

export interface DocumentComponentOpenToggleEvent {
  originalEvent: Event;
  open: boolean;
}

export interface DocumentComponentToggleAnnotationEvent {
  originalEvent: Event;
}

export type DocumentComponentWijzigactie = "voegtoe" | "verwijder" | "nieuweContainer" | "verwijderContainer";

export type DocumentComponentAnnotationsWijzigactie = "voegtoe" | "verwijder";

export interface DocumentComponentOzonContentClickEvent {
  originalEvent: DsoOzonContentCustomEvent<OzonContentClickEvent>;
  ozonContentClick: OzonContentClickEvent;
}

export type DocumentComponentInputType = XMLDocument | string;

type DocumentComponentSource = "kop" | "inhoud";

export type DocumentComponentMarkFunction = (text: string, source: DocumentComponentSource) => OzonContentText[];

export interface DocumentComponentMarkItemHighlightEvent {
  source: DocumentComponentSource;
  text: string;
  elementRef: HTMLElement;
}

export type DocumentComponentRecursiveToggleState = undefined | boolean | "indeterminate";

export interface DocumentComponentRecursiveToggleEvent {
  originalEvent: MouseEvent;
  current: DocumentComponentRecursiveToggleState;
  next: boolean;
}

export type DocumentComponentMode = "document" | "table-of-contents";

export interface DocumentComponentTableOfContentsClickEvent {
  originalEvent: MouseEvent;
  /** True when user clicked the document component heading while holding Ctrl, Alt or other modifiers, or when the document component heading is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export interface DocumentComponentAantekenElement {
  type: "Vervallen" | "Gereserveerd";
  wijzigactie?: DocumentComponentWijzigactie;
}
