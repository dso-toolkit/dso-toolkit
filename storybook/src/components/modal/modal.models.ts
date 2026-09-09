import { TemplateResult } from "lit-html";

export interface Modal {
  body: TemplateResult | string;
  fullscreen?: boolean;
  modalTitle?: string;
  footer?: TemplateResult | string;
  role?: ModalRole;
  closable?: boolean;
  dsoClose?: (e: CustomEvent<ModalCloseEvent>) => void;
}

export interface ModalCloseEvent {
  originalEvent?: MouseEvent | Event;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
