import { IconAlias } from "../icon";

export interface HighlightBox<TemplateFnReturnType = string> {
  yellow?: boolean;
  white?: boolean;
  grey?: boolean;
  green?: boolean;
  dropShadow?: boolean;
  border?: boolean;
  step?: number;
  icon?: IconAlias;
  content: TemplateFnReturnType | string;
  bannerImage?: boolean;
}
