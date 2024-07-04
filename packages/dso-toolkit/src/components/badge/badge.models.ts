export type BadgeStatus = "primary" | "success" | "info" | "warning" | "danger" | "error" | "outline" | "attention";

export interface Badge {
  status?: BadgeStatus;
  message: string;
}
