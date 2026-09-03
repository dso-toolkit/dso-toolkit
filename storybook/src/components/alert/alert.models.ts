import { Button } from "../button/button.models.js";

export type AlertStatus = "success" | "info" | "warning" | "error";

export interface Alert<TemplateFnReturnType> {
  status: AlertStatus;
  message: TemplateFnReturnType | string;
  compact?: boolean;
  closable?: boolean;
  dsoClose?: (e: CustomEvent<AlertCloseEvent>) => void;
  interaction?: Button;
  withRoleAlert?: boolean;
}

export interface AlertCloseEvent {
  originalEvent?: MouseEvent | Event;
}
