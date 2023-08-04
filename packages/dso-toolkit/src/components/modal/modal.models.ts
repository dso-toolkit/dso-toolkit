export interface Modal<TemplateFnReturnType> {
  body: TemplateFnReturnType;
  fullscreen?: boolean;
  modalTitle?: string;
  footer?: TemplateFnReturnType;
  role?: ModalRole;
  showCloseButton?: boolean;
  initialFocus?: string;
  dsoClose?: (e: CustomEvent<DsoModalCloseEvent>) => void;
  returnFocus?: (e: HTMLElement | SVGElement) => HTMLElement | SVGElement | string | false;
}

export interface DsoModalCloseEvent {
  originalEvent?: MouseEvent;
}

export type ModalRole = "alert" | "dialog" | "alertdialog";
