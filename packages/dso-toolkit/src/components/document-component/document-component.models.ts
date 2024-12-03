import { OzonContentText } from "../ozon-content/ozon-content.models";

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
  label: string;
  notApplicable?: boolean;
  nummer: string;
  open?: boolean;
  openAnnotation?: boolean;
  opschrift?: string;
  type: DocumentComponentType;
  vervallen?: boolean;
  wijzigactie?: DocumentComponentWijzigactie;
  annotationsWijzigactie?: DocumentComponentWijzigactie;
  enableRecursiveToggle?: boolean;
  mark?: DocumentComponentMarkFunction;
  dsoMarkItemHighlight?: (e: CustomEvent<DocumentComponentMarkItemHighlightEvent>) => void;
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

export interface DocumentComponentToggleEvent {
  originalEvent: Event;
}

export interface DocumentComponentAnnotationToggleEvent {}

export type DocumentComponentSource = "label" | "nummer" | "opschrift" | "inhoud";

export type DocumentComponentMarkFunction = (text: string, source: DocumentComponentSource) => OzonContentText[];

export interface DocumentComponentMarkItemHighlightEvent {
  source: DocumentComponentSource;
  text: string;
  elementRef: HTMLElement;
}
