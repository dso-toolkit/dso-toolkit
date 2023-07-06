export interface DocumentComponent<TemplateFnReturnType> {
  heading: DocumentComponentHeading;
  type: DocumentComponentType;
  nummer: string;
  label: string;
  opschrift?: string;
  inhoud?: string;
  suppressed?: boolean;
  filtered?: boolean;
  open?: boolean;
  children: TemplateFnReturnType;
  dsoToggle?: (e: CustomEvent<DocumentComponentToggleEvent>) => void;
}

export type DocumentComponentHeading = "h2" | "h3" | "h4" | "h5" | "h6";

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
