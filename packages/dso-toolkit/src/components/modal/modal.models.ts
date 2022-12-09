export interface Modal<TemplateFnReturnType> {
  modalTitle?: string;
  body: TemplateFnReturnType;
  footer?: TemplateFnReturnType;
  role?: ModalRole;
  showCloseButton?: boolean;
  dsoClose?: (value: CustomEvent) => void;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
