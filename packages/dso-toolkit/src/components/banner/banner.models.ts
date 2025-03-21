export interface Banner<TemplateFnReturnType> {
  status: BannerStatus;
  compact?: boolean;
  icon?: boolean;
  content: TemplateFnReturnType;
}

export type BannerStatus = "danger" | "error" | "info" | "warning";
