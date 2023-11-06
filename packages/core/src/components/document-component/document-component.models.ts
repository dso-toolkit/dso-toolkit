import { DsoOzonContentCustomEvent } from "../../components";
import { OzonContentAnchorClickEvent, OzonContentText } from "../ozon-content/ozon-content.interfaces";

export interface DocumentComponentOpenToggleEvent {
  originalEvent: Event;
  open: boolean;
}

export interface DocumentComponentToggleAnnotationEvent {
  originalEvent: Event;
}

export type DocumentComponentWijzigactie = "voegtoe" | "verwijder" | "nieuweContainer" | "verwijderContainer";

export interface DocumentComponentOzonContentAnchorClickEvent {
  originalEvent: DsoOzonContentCustomEvent<OzonContentAnchorClickEvent>;
  ozonContentAnchorClick: OzonContentAnchorClickEvent;
}

export type DocumentComponentInputType = XMLDocument | string;

export type DocumentComponentSource = "label" | "nummer" | "opschrift" | "inhoud";

export type DocumentComponentMarkFunction = (text: string, source: DocumentComponentSource) => OzonContentText[];

export interface DocumentComponentMarkItemHighlightEvent {
  source: DocumentComponentSource;
  text: string;
  elementRef: HTMLElement;
}
