export interface Modal<TemplateFnReturnType> {
  body: TemplateFnReturnType;
  fullscreen?: boolean;
  modalTitle?: string;
  footer?: TemplateFnReturnType;
  role?: ModalRole;
  closable?: boolean;
  dsoClose?: (e: CustomEvent<ModalCloseEvent>) => void;
}

export interface ModalCloseEvent {
  originalEvent?: MouseEvent | Event;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
