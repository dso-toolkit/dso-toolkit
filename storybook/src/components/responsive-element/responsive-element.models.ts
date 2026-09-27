import { TemplateResult } from "lit-html";

export interface ResponsiveElement {
  dsoSizeChange: (value: CustomEvent<string>) => void;
  children: TemplateResult | string;
}
