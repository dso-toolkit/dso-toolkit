export interface Context<TemplateFnReturnType> {
  label: TemplateFnReturnType;
  type: 'legend' | 'label';
  content: TemplateFnReturnType;
  children: TemplateFnReturnType;
}
