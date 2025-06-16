import { ArgTypes } from "@storybook/types";

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

export function bannerArgsMapper<TemplateFnReturnType>(
  a: BannerArgs,
  content: TemplateFnReturnType,
): Banner<TemplateFnReturnType> {
  return {
    ...a,
    content,
  };
}
