export enum AlertStatus {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

export interface Alert<TemplateFnReturnType> {
  status: AlertStatus;
  message: TemplateFnReturnType | string;
  onClick?: (e: MouseEvent) => void;
  withRoleAlert?: boolean;
}
