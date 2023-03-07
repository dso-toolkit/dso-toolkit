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
}

export interface DsoModalController<TemplateFnReturnType> {
  getInstance(component: TemplateFnReturnType): ModalContentComponent<TemplateFnReturnType>;
  create(properties: Modal<TemplateFnReturnType>): ModalContentComponent<TemplateFnReturnType>;
}
