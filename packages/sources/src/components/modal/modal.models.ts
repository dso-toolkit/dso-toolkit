export interface Modal<TemplateFnReturnType> {
  modalTitle?: string;
  body: TemplateFnReturnType;
  footer?: TemplateFnReturnType;
  role?: ModalRole;
  dsoClose?: (value: CustomEvent) => void;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
