import { BadgeStatus } from "../badge";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface Toggletip<TemplateFnReturnType> {
  children: TemplateFnReturnType | string;
  mode?: "toggle" | "secondary" | "badge" | "icon";
  position?: TooltipPosition;
  strategy?: "absolute" | "fixed";
  small?: boolean;
  label?: string;
  badgeStatus?: BadgeStatus;
  icon?: string;
  iconActive?: string;
}

export function isToggletipInterface<TemplateFnReturnType>(object: unknown): object is Toggletip<TemplateFnReturnType> {
  return "position" in (object as Toggletip<TemplateFnReturnType>);
}
