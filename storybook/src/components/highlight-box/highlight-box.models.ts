import { IconAlias } from "../icon/icon.models.js";

export interface HighlightBox<TemplateFnReturnType = unknown> {
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
