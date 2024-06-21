export interface Toggletip<TemplateFnReturnType> {
  children: TemplateFnReturnType | string;
  position?: "top" | "right" | "bottom" | "left";
  small?: boolean;
  label?: string;
  secondary?: boolean;
}

export function isToggletipInterface<TemplateFnReturnType>(object: unknown): object is Toggletip<TemplateFnReturnType> {
  return "position" in (object as Toggletip<TemplateFnReturnType>);
}
