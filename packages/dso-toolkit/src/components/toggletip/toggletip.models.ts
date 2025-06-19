import { BadgeStatus } from "../badge";

export interface Toggletip<TemplateFnReturnType> {
  children: TemplateFnReturnType | string;
  mode?: "toggle" | "secondary" | "badge" | "icon";
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  strategy?: "absolute" | "fixed";
  small?: boolean;
  label?: string;
  badgeStatus?: BadgeStatus;
  icon?: string;
  iconActive?: string;
  withContainer?: boolean;
}

export function isToggletipInterface<TemplateFnReturnType>(object: unknown): object is Toggletip<TemplateFnReturnType> {
  return "position" in (object as Toggletip<TemplateFnReturnType>);
}
