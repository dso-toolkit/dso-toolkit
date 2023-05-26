import { TemplateRef, Type } from "@angular/core";

export type ModalRole = "dialog" | "alert" | "alertdialog";

export type AllowedModalContentTypes = Type<unknown> | TemplateRef<unknown>;

export interface ModalContent {
  title?: string;
  body: AllowedModalContentTypes;
  footer?: AllowedModalContentTypes;
}

export interface ModalOptions {
  role?: ModalRole;
  showCloseButton?: boolean;
  initialFocus?: string;
  returnFocus?: (e: HTMLElement | SVGElement) => HTMLElement | SVGElement | string | false;
}
