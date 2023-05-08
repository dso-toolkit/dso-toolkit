export interface Modal<TemplateFnReturnType> {
  modalTitle?: string;
  body: TemplateFnReturnType;
  footer?: TemplateFnReturnType;
  role?: ModalRole;
  showCloseButton?: boolean;
  initialFocus?: string;
  dsoClose?: (e: CustomEvent<DsoModalCloseEvent>) => void;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";

export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export interface ModalContent<TemplateFnReturnType> {
  title?: string;
  body: TemplateFnReturnType;
  footer?: TemplateFnReturnType;
}

export interface ModalOptions {
  role?: ModalRole;
  showCloseButton?: boolean;
  initialFocus?: string;
}
