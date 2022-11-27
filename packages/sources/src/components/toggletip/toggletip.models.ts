export interface Toggletip<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  position?: "top" | "right" | "bottom" | "left";
  small?: boolean;
  label?: string;
  secondary?: boolean;
}
