export enum AlertType {
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

export interface Alert<TemplateFnReturnType> {
  status: AlertType;
  message: TemplateFnReturnType | string;
  onClick?: (e: MouseEvent) => void;
  withRoleAlert?: boolean;
}
