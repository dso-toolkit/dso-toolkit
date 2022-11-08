export interface Modal {
  modalTitle?: string;
  body: string;
  footer?: string;
  role?: ModalRole;
  dsoClose?: (value: CustomEvent) => void;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
