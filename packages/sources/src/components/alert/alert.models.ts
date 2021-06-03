export enum AlertType {
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Success = 'success'
}

export interface Alert<TemplateFnReturnType> {
  status: AlertType;
  message: TemplateFnReturnType | string;
  onClick?: (e: MouseEvent) => void;
  withRoleAlert?: boolean;
}

export interface AlertWithHeadingsContent {
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  content: string;
}
