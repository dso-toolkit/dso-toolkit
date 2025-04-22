export interface OzonContent {
  content: string;
  inline?: boolean;
  mark?: OzonContentMarkFunction;
  urlResolver?: OzonContentUrlResolver;
  dsoAnchorClick: (e: CustomEvent) => void;
  dsoOzonContentMarkItemHighlight: (e: CustomEvent) => void;
}

export type OzonContentMarkFunction = (text: string) => OzonContentText[] | undefined;

export type OzonContentText = OzonContentMarkItem | string;

export interface OzonContentMarkItem {
  text: string;
  highlight?: boolean;
}

export interface OzonContentUrlResolver {
  (name: "Illustratie" | "InlineTekstAfbeelding", attribute: "naam", value: string | null, element: Element): string;
  (name: "ExtIoRef" | "ExtRef", attribute: "ref", value: string | null, element: Element): string;
}
