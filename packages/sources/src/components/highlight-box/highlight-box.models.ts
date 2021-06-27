export interface HighlightBox<TemplateFnReturnType> {
  yellow?: boolean;
  white?: boolean;
  dropShadow?: boolean;
  border?: boolean;
  step?: number;
  icon?: string;
  richContent: TemplateFnReturnType;
}
