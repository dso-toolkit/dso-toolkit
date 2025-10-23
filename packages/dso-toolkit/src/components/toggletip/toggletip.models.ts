import { BadgeStatus } from "../badge";

export type ToggletipVariant = "information" | "badge";

export interface Toggletip<TemplateFnReturnType> {
  children: TemplateFnReturnType | string;
  variant?: ToggletipVariant;
  label?: string;
  placement?: "top" | "right" | "bottom" | "left";
  status?: BadgeStatus;
  message?: string;
}

export function isToggletipInterface<TemplateFnReturnType>(object: unknown): object is Toggletip<TemplateFnReturnType> {
  return "placement" in (object as Toggletip<TemplateFnReturnType>);
}
