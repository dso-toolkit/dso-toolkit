export interface LegendGroup<TemplateFnReturnType = unknown> {
  mode?: "edit" | "view";
  heading?: TemplateFnReturnType;
  children?: TemplateFnReturnType;
}
