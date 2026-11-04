import { InfoCloseEvent } from "@dso-toolkit/core";
import { TemplateResult } from "lit-html";

export interface Info {
  id?: string;
  fixed?: boolean;
  active?: boolean;
  closeLabel?: string;
  content: TemplateResult | string;
  dsoClose?: (e: CustomEvent<InfoCloseEvent>) => void;
}
