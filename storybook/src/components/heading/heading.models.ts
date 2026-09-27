import { TemplateResult } from "lit-html";

export interface Heading {
  level: number;
  children: TemplateResult | string;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
