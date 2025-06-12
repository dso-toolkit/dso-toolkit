export type BadgeStatus = "primary" | "success" | "info" | "warning" | "error" | "outline" | "attention";

export interface Badge {
  status?: BadgeStatus;
  message: string;
}
