export interface HighlightBox<TemplateFnReturnType = string> {
  yellow?: boolean;
  white?: boolean;
  dropShadow?: boolean;
  border?: boolean;
  step?: number;
  icon?: string;
  richContent: TemplateFnReturnType | string;
  bannerImage?: boolean;
}
