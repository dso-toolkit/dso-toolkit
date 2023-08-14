export interface Modal<TemplateFnReturnType> {
  body: TemplateFnReturnType;
  fullscreen?: boolean;
  modalTitle?: string;
  footer?: TemplateFnReturnType;
  role?: ModalRole;
  showCloseButton?: boolean;
  dsoClose?: (e: CustomEvent<DsoModalCloseEvent>) => void;
}

export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
