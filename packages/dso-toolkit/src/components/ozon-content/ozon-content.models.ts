export interface OzonContent {
  content: string;
  inline?: boolean;
  mark?: OzonContentMarkFunction;
  urlResolver?: OzonContentUrlResolver;
  dsoClick: (e: CustomEvent) => void;
  dsoOzonContentMarkItemHighlight: (e: CustomEvent) => void;
  begripResolver?: OzonContentBegripResolver;
}

export type OzonContentMarkFunction = (text: string) => OzonContentText[] | undefined;

export type OzonContentText = OzonContentMarkItem | string;

export interface OzonContentMarkItem {
  text: string;
  highlight?: boolean;
}

export interface OzonContentUrlResolver {
  (name: "Illustratie" | "InlineTekstAfbeelding", attribute: "naam", value: string | null, element: Element): string;
  (
    name: "ExtIoRef" | "ExtRef" | "IntIoRef" | "IntRef",
    attribute: "ref",
    value: string | null,
    element: Element,
  ): string;
}

export interface OzonContentBegripResolver {
  (name: "IntRef", attribute: "ref", value: string | null, element: Element): XMLDocument | string;
}
