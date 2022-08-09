// Sync interfaces with readme.md

export interface OzonContentAnchorClick {
  /** Node type, eg: `IntRef` or `IntIoRef` */
  node: string;
  href: string;
  documentComponent: string;
  originalEvent: MouseEvent;
}

export interface OzonContentClick {
  originalEvent: Event;
}
