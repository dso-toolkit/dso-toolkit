import { DsoOzonContentCustomEvent } from "../../components";
import { OzonContentAnchorClickEvent } from "../ozon-content/ozon-content.interfaces";

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
