export interface Modal {
  modalTitle?: string;
  body: string;
  footer?: string;
  role: ModalRole;
  dsoClose?: (value: CustomEvent) => void;
}

export interface ModalMethods {
  openModal(): Promise<void>;
  closeModal(): Promise<void>;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
