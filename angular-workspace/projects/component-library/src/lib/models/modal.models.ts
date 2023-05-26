import { TemplateRef, Type } from "@angular/core";

export type ModalRole = "dialog" | "alert" | "alertDialog";

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
}
