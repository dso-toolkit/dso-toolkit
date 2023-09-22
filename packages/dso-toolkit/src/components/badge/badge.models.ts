export enum BadgeStatus {
  Primary = "primary",
  Success = "success",
  Info = "info",
  Warning = "warning",
  Danger = "danger",
  Error = "error",
  Outline = "outline",
  Attention = "attention",
}

export interface Badge {
  status?: BadgeStatus;
  message: string;
}
