interface OzonContentClickBaseEvent<T extends string> {
  type: T;
  node: Element;
  originalEvent: MouseEvent;
}

export type OzonContentClickKopEvent = OzonContentClickBaseEvent<"Kop">;
export type OzonContentClickIntIoRefToggleAnnotationEvent = OzonContentClickBaseEvent<"IntIoRefToggleAnnotation">;
export type OzonContentClickIntRefEvent = OzonContentClickBaseEvent<"IntRef">;

export type OzonContentClickEvent =
  | OzonContentClickKopEvent
  | OzonContentClickIntRefEvent
  | OzonContentClickIntIoRefToggleAnnotationEvent;

export type OzonContentInputType = XMLDocument | string;

export type OzonContentMarkFunction = (text: string) => OzonContentText[] | undefined;

export type OzonContentText = OzonContentMarkItem | string;

export interface OzonContentMarkItem {
  text: string;
  highlight?: boolean;
}

export interface OzonContentMarkItemHighlightEvent {
  text: string;
  elementRef: HTMLElement;
}

export type OzonContentWijzigActie = "voegtoe" | "verwijder";

export interface OzonContentUrlResolver {
  (name: "Illustratie" | "InlineTekstAfbeelding", attribute: "naam", value: string | null, element: Element): string;
  (name: "ExtIoRef" | "ExtRef" | "IntIoRef", attribute: "ref", value: string | null, element: Element): string;
}

export interface OzonContentBegripResolver {
  (name: "IntRef", attribute: "ref", value: string | null, element: Element): XMLDocument | string;
}
