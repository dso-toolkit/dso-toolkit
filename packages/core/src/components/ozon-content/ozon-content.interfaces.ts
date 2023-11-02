// Sync interfaces with readme.md

export interface OzonContentAnchorClickEvent {
  /** Node type, eg: `IntRef` or `IntIoRef` */
  node: string;
  href: string;
  documentComponent: string;
  originalEvent: MouseEvent;
}

export type OzonContentInputType = XMLDocument | string;
