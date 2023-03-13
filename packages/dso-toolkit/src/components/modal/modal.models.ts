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

// Modal Controller Models
export interface ModalContentComponent<TemplateFnReturnType> {
  component: TemplateFnReturnType;
  open(): void;
  close(): void;
  addEventListener?(eventName: string, fn: () => void): void;
  removeEventListener?(eventName: string, fn: () => void): void;
}

export interface DsoModalController<TemplateFnReturnType, ContentTemplateType = never> {
  createInstance(
    content: ModalContent<ContentTemplateType | TemplateFnReturnType>,
    options: ModalOptions
  ): ModalContentComponent<TemplateFnReturnType>;
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
