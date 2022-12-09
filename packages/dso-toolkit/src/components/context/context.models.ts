export interface Context<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  content: TemplateFnReturnType;
  label: TemplateFnReturnType;
  type: "legend" | "label";
}
