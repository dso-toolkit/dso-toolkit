export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent | Event;
}

export type ModalRole = "dialog" | "alert" | "alertdialog";

export type AllowedModalContentTypes = HTMLElement | DocumentFragment | string;
