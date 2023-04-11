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

export interface ModalController<TemplateFnReturnType> {
  open(modal: ModalContent<TemplateFnReturnType>, config?: ModalConfig): ModalRef;
}

export interface ModalRef {
  close(): void;
  onDsoClose(fn: (e: Event | CustomEvent) => void): void;
  offDsoClose(): void;
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

export interface ModalConfig {
  data?: any;
  options?: ModalOptions;
}
