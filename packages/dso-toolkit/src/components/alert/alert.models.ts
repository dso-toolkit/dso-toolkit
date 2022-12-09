export enum AlertType {
  Error = "error",
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
