// Sync interfaces with readme.md

export interface OzonContentAnchorClickEvent {
  /** Node type, eg: `IntRef` or `IntIoRef` */
  node: string;
  href: string;
  documentComponent: string;
  originalEvent: MouseEvent;
}

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
