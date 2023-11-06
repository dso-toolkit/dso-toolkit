export type AlertStatus = "success" | "info" | "warning" | "error";

export interface Alert<TemplateFnReturnType> {
  status: AlertStatus;
  message: TemplateFnReturnType | string;
  onClick?: (e: MouseEvent) => void;
  withRoleAlert?: boolean;
}
