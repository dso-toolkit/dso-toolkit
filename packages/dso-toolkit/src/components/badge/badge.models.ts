export interface Badge {
  status?: "primary" | "success" | "info" | "warning" | "danger" | "error" | "outline" | "attention";
  message: string;
}
