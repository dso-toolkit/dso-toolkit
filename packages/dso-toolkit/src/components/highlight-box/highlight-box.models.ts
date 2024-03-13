export interface HighlightBox<TemplateFnReturnType = string> {
  yellow?: boolean;
  white?: boolean;
  grey?: boolean;
  dropShadow?: boolean;
  border?: boolean;
  step?: number;
  icon?: string;
  content: TemplateFnReturnType | string;
  bannerImage?: boolean;
}
