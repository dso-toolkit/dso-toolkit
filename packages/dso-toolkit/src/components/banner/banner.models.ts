export interface Banner<TemplateFnReturnType> {
  status: "warning" | "danger";
  content: TemplateFnReturnType;
  onClick?: (e: Event) => void;
}
