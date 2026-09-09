import { TemplateResult } from "lit-html";

import { IconAlias } from "../icon/icon.models.js";

export interface HighlightBox {
  yellow?: boolean;
  white?: boolean;
  grey?: boolean;
  green?: boolean;
  dropShadow?: boolean;
  border?: boolean;
  step?: number;
  icon?: IconAlias;
  content: TemplateResult | string;
  bannerImage?: boolean;
}
