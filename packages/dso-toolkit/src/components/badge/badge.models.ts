export type BadgeStatus = "primary" | "success" | "info" | "warning" | "error" | "outline" | "attention";

export type BadgeTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface Badge<TemplateFnReturnType> {
  status?: BadgeStatus;
  message: string;
  label?: string;
  toggletipPlacement?: BadgeTooltipPlacement;
  tooltipPlacement?: BadgeTooltipPlacement;
  children?: TemplateFnReturnType;
}
