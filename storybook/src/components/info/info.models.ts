import { TemplateResult } from "lit-html";

export interface Info {
  id?: string;
  fixed?: boolean;
  active?: boolean;
  content: TemplateResult | string;
  dsoClose?: (e: CustomEvent<MouseEvent>) => void;
}
