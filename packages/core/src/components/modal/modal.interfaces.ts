export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export type ModalRole = "dialog" | "alert" | "alertdialog";

export type AllowedModalContentTypes = HTMLElement | DocumentFragment | string;

export interface ModalContent {
  title?: string;
  body: AllowedModalContentTypes;
  footer?: AllowedModalContentTypes;
}

export interface ModalOptions {
  fullscreen?: boolean;
  role?: ModalRole;
  showCloseButton?: boolean;
  initialFocus?: string;
  returnFocus?: (nodeFocusedBeforeActivation: HTMLElement | SVGElement) => HTMLElement | SVGElement | string | false;
}
