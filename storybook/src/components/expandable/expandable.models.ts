export interface Expandable<TemplateFnReturnType> {
  open?: boolean;
  enableAnimation?: boolean;
  minimumHeight?: number;
  content: TemplateFnReturnType;
}
