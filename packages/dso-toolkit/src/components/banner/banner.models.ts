export interface Banner<TemplateFnReturnType> {
  status: BannerStatus;
  compact?: boolean;
  icon?: boolean;
  content: TemplateFnReturnType;
}

export type BannerStatus = "success" | "error" | "info" | "warning";
