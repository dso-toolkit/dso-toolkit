export interface ResponsiveElement<TemplateFnReturnType> {
  dsoSizeChange: (value: CustomEvent<string>) => void;
  children: TemplateFnReturnType;
}
