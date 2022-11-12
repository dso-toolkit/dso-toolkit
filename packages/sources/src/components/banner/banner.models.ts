export interface Banner<TemplateFnReturnType> {
  status: string;
  content: TemplateFnReturnType;
  onClick?: (e: Event) => void;
}
