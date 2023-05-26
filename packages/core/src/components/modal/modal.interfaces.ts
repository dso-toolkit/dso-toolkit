export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export type ModalRole = "dialog" | "alert" | "alertDialog";

export type AllowedModalContentTypes = HTMLElement | DocumentFragment | string;

export interface ModalContent {
  title?: string;
  body: AllowedModalContentTypes;
  footer?: AllowedModalContentTypes;
}

export interface ModalOptions {
  role?: ModalRole;
  showCloseButton?: boolean;
  initialFocus?: string;
}
