import { TemplateResult } from "lit-html";

export type BadgeStatus = "primary" | "success" | "info" | "warning" | "error" | "outline" | "attention";

export type BadgeTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface Badge {
  status?: BadgeStatus;
  message: string;
  label?: string;
  toggletipPlacement?: BadgeTooltipPlacement;
  children?: TemplateResult | string;
}
