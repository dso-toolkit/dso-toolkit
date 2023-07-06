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
  wijzigactie?: DocumentComponentWijzigActie;
}

export type DocumentComponentHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export type DocumentComponentWijzigActie = "voegtoe" | "verwijder" | "nieuweContainer" | "verwijderContainer";

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
