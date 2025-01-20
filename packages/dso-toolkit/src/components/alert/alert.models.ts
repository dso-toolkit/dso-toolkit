export type AlertStatus = "success" | "info" | "warning" | "error";

export interface Alert<TemplateFnReturnType> {
  status: AlertStatus;
  message: TemplateFnReturnType | string;
  compact?: boolean;
  closable?: boolean;
  dsoClose?: (e: CustomEvent<AlertCloseEvent>) => void;
  onClick?: (e: MouseEvent) => void;
  withRoleAlert?: boolean;
}

export interface AlertCloseEvent {
  originalEvent?: MouseEvent | Event;
}
