import { TemplateResult } from "lit-html";

export interface Banner {
  status: BannerStatus;
  compact?: boolean;
  icon?: boolean;
  content: TemplateResult | string;
}

export type BannerStatus = "success" | "error" | "info" | "warning";
