export interface Banner<TemplateFnReturnType> {
  status: BannerStatus;
  compact?: boolean;
  noIcon?: boolean;
  content: TemplateFnReturnType;
}

export const bannerStatus = ["danger", "error", "info", "warning"] as const;

export type BannerStatus = (typeof bannerStatus)[number];
