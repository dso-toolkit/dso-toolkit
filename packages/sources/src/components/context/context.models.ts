export interface Context<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  label: string;
  type: 'legend' | 'label';
}
