import { TemplateResult } from "lit-html";

export interface Expandable {
  open?: boolean;
  enableAnimation?: boolean;
  minimumHeight?: number;
  content: TemplateResult | string;
}
