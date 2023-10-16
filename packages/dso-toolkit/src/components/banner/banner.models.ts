export interface Banner<TemplateFnReturnType> {
  status: BannerStatus;
  compact?: boolean;
  noIcon?: boolean;
  content: TemplateFnReturnType;
}

export type BannerStatus = "danger" | "error" | "info" | "warning";
