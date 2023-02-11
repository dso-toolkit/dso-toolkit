export interface AnnotationOutput<TemplateFnReturnType> {
  identifier: string;
  title: TemplateFnReturnType;
  addons?: TemplateFnReturnType;
  content: TemplateFnReturnType;
}
