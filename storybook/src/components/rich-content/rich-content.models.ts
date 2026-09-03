export interface RichContent<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  slot?: string;
}
