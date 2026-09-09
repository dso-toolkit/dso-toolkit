import { TemplateResult } from "lit-html";
import { ArgTypes } from "storybook/internal/types";

import { Banner, BannerStatus } from "./banner.models.js";

export interface BannerArgs {
  status: BannerStatus;
  compact: boolean;
  icon: boolean;
}

export const bannerArgTypes: ArgTypes<BannerArgs> = {
  status: {
    options: ["success", "error", "info", "warning"],
    control: {
      type: "select",
    },
  },
  compact: {
    type: "boolean",
  },
  icon: {
    type: "boolean",
  },
};

export function bannerArgsMapper(a: BannerArgs, content: TemplateResult | string): Banner {
  return {
    ...a,
    content,
  };
}
