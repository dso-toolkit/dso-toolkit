import { TemplateResult } from "lit-html";

export interface Context {
  children: TemplateResult | string;
  content: TemplateResult | string;
  label: TemplateResult | string;
  type: "legend" | "label";
  alignLeft?: boolean;
}
