import { OzonContentText, OzonContentUrlResolver } from "../ozon-content/ozon-content.models.js";

export interface DocumentComponent<TemplateFnReturnType> {
  alternativeTitle?: string;
  annotated?: boolean;
  bevatOntwerpInformatie?: boolean;
  children?: TemplateFnReturnType;
  dsoAnnotationToggle?: (e: CustomEvent<DocumentComponentAnnotationToggleEvent>) => void;
  dsoToggle?: (e: CustomEvent<DocumentComponentToggleEvent>) => void;
  filtered?: boolean;
  genesteOntwerpInformatie?: boolean;
  gereserveerd?: boolean;
  heading: DocumentComponentHeading;
  inhoud?: string;
  notApplicable?: boolean;
  open?: boolean;
  openAnnotation?: boolean;
  kop?: string;
  type: DocumentComponentType;
  vervallen?: boolean;
  wijzigactie?: DocumentComponentWijzigactie;
  annotationsWijzigactie?: DocumentComponentWijzigactie;
  enableRecursiveToggle?: boolean;
  mark?: DocumentComponentMarkFunction;
  mode: DocumentComponentMode;
  href?: string;
  dsoMarkItemHighlight?: (e: CustomEvent<DocumentComponentMarkItemHighlightEvent>) => void;
  dsoTableOfContentsClick?: (e: CustomEvent<DocumentComponentTableOfContentsClickEvent>) => void;
  ozonContentUrlResolver?: OzonContentUrlResolver;
}

export type DocumentComponentHeading = "h2" | "h3" | "h4" | "h5" | "h6";

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

export interface DocumentComponentTableOfContentsClickEvent {
  originalEvent: MouseEvent;
  /** True when user clicked the card while holding Ctrl, Alt or other modifiers, or when the card is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
