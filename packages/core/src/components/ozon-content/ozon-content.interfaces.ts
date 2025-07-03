export interface OzonContentAnchorClickEvent {
  /** Node type, eg: `IntRef` or `IntIoRef` */
  node: string;
  href: string;
  documentComponent: string;
  originalEvent: MouseEvent;
}

export type OzonContentClickEvent = OzonContentClickKopEvent;

interface OzonContentClickBaseEvent<T extends string> {
  type: T;
  node: Element;
  originalEvent: MouseEvent;
}

export type OzonContentClickKopEvent = OzonContentClickBaseEvent<"Kop">;

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
  (name: "ExtIoRef" | "ExtRef", attribute: "ref", value: string | null, element: Element): string;
}
