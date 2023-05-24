export interface Modal<TemplateFnReturnType> {
  modalTitle?: string;
  body: TemplateFnReturnType;
  footer?: TemplateFnReturnType;
  role?: ModalRole;
  showCloseButton?: boolean;
  initialFocus?: string;
  dsoClose?: (e: CustomEvent<DsoModalCloseEvent>) => void;
}

export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
