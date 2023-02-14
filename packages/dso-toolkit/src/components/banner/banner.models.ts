export interface Banner<TemplateFnReturnType> {
  status: "warning" | "danger" | "error";
  content: TemplateFnReturnType;
  onClick?: (e: Event) => void;
}
