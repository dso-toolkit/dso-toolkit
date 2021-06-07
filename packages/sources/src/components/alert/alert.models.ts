export interface Alert {
  status: string;
  message: string;
  onClick?: (e: MouseEvent) => void;
  withRoleAlert?: boolean;
}
