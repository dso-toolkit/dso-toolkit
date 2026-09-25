import { TemplateResult } from "lit-html";

export interface RichContent {
  children: TemplateResult | string;
  slot?: string;
}
