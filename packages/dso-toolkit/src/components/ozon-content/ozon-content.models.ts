export interface OzonContent {
  content: string;
  inline?: boolean;
  mark?: OzonContentMarkFunction;
  urlResolver?: OzonContentUrlResolver;
  dsoClick: (e: CustomEvent<OzonContentClickEvent>) => void;
  dsoOzonContentMarkItemHighlight: (e: CustomEvent) => void;
  begripResolver?: OzonContentBegripResolver;
}

interface OzonContentClickBaseEvent<T extends string> {
  type: T;
  node: Element;
  originalEvent: MouseEvent;
}

export type OzonContentClickKopEvent = OzonContentClickBaseEvent<"Kop">;
export type OzonContentClickIntIoRefEvent = OzonContentClickBaseEvent<"IntIoRef">;
export type OzonContentClickIntRefEvent = OzonContentClickBaseEvent<"IntRef"> & { isModifiedEvent: boolean };

export type OzonContentClickEvent =
  | OzonContentClickKopEvent
  | OzonContentClickIntRefEvent
  | OzonContentClickIntIoRefEvent;

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
  (ref: string | null, element: Element): XMLDocument | string | undefined;
}
