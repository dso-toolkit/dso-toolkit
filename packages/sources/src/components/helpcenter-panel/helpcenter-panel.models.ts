export interface HelpcenterPanel<TemplateFnReturnType> {
  content: TemplateFnReturnType | string;
  label?: string;
  url: string;
}
