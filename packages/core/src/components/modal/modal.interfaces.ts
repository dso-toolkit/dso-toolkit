export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export type ModalRole = "dialog" | "alert" | "alertdialog";

export type AllowedModalContentTypes = HTMLElement | DocumentFragment | string;
