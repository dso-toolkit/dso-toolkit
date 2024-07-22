export interface Panel<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  heading: TemplateFnReturnType;
  dsoCloseClick?: (e: CustomEvent) => void;
}
