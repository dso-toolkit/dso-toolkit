import {
  OzonContentBegripResolver,
  OzonContentText,
  OzonContentUrlResolver,
} from "../ozon-content/ozon-content.models.js";

export interface DocumentComponent<TemplateFnReturnType> {
  alternativeTitle?: string;
  annotated?: boolean;
  bevatOntwerpInformatie?: boolean;
  children?: TemplateFnReturnType;
  dsoAnnotationToggle?: (e: CustomEvent<DocumentComponentAnnotationToggleEvent>) => void;
  dsoToggle?: (e: CustomEvent<DocumentComponentToggleEvent>) => void;
  filtered?: boolean;
  genesteOntwerpInformatie?: boolean;
  gereserveerd?: DocumentComponentInputType;
  heading: DocumentComponentHeading;
  inhoud?: string;
  notApplicable?: boolean;
  open?: boolean;
  openAnnotation?: boolean;
  kop?: string;
  type: DocumentComponentType;
  vervallen?: DocumentComponentInputType;
  wijzigactie?: DocumentComponentWijzigactie;
  annotationsWijzigactie?: DocumentComponentWijzigactie;
  enableRecursiveToggle?: boolean;
  mark?: DocumentComponentMarkFunction;
  mode: DocumentComponentMode;
  href?: string;
  dsoMarkItemHighlight?: (e: CustomEvent<DocumentComponentMarkItemHighlightEvent>) => void;
  dsoTableOfContentsClick?: (e: CustomEvent<DocumentComponentTableOfContentsClickEvent>) => void;
  dsoOzonContentClick?: (e: CustomEvent<DocumentComponentOzonContentClickEvent>) => void;
  ozonContentUrlResolver?: OzonContentUrlResolver;
  ozonContentBegripResolver?: OzonContentBegripResolver;
}

export type DocumentComponentHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export type DocumentComponentInputType = XMLDocument | string;

export type DocumentComponentWijzigactie = "voegtoe" | "verwijder" | "nieuweContainer" | "verwijderContainer";

export type DocumentComponentAnnotationsWijzigactie = "voegtoe" | "verwijder";

export type DocumentComponentType =
  | "LICHAAM"
  | "HOOFDSTUK"
  | "AFDELING"
  | "ARTIKEL"
  | "LID"
  | "PARAGRAAF"
  | "SUBPARAGRAAF"
  | "SUBSUBPARAGRAAF";

export type DocumentComponentMode = "document" | "table-of-contents";

export interface DocumentComponentToggleEvent {
  originalEvent: Event;
}

export interface DocumentComponentAnnotationToggleEvent {}

type DocumentComponentSource = "kop" | "inhoud";

export type DocumentComponentMarkFunction = (text: string, source: DocumentComponentSource) => OzonContentText[];

export interface DocumentComponentMarkItemHighlightEvent {
  source: DocumentComponentSource;
  text: string;
  elementRef: HTMLElement;
}

interface OzonContentClickBaseEvent<T extends string> {
  type: T;
  node: Element;
  originalEvent: MouseEvent;
}

export type OzonContentClickKopEvent = OzonContentClickBaseEvent<"Kop">;
export type OzonContentClickExtRefEvent = OzonContentClickBaseEvent<"ExtRef">;
export type OzonContentClickIntIoRefToggleAnnotationEvent = OzonContentClickBaseEvent<"IntIoRefToggleAnnotation">;
export type OzonContentClickIntRefEvent = OzonContentClickBaseEvent<"IntRef">;

export type OzonContentClickEvent =
  | OzonContentClickKopEvent
  | OzonContentClickIntRefEvent
  | OzonContentClickIntIoRefToggleAnnotationEvent
  | OzonContentClickExtRefEvent;

export interface DocumentComponentOzonContentClickEvent {
  originalEvent: MouseEvent;
  ozonContentClick: OzonContentClickEvent;
  /** True when user clicked the card while holding Ctrl, Alt or other modifiers, or when the card is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export interface DocumentComponentTableOfContentsClickEvent {
  originalEvent: MouseEvent;
  /** True when user clicked the card while holding Ctrl, Alt or other modifiers, or when the card is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
