import { ArgTypes } from "@storybook/types";

import { Banner, BannerStatus, bannerStatus } from "./banner.models.js";

export interface BannerArgs {
  status: BannerStatus;
  compact: boolean;
  noIcon: boolean;
  inGrid: boolean;
}

export const bannerArgTypes: ArgTypes<BannerArgs> = {
  status: {
    options: bannerStatus,
    control: {
      type: "select",
    },
  },
  compact: {
    type: "boolean",
  },
  noIcon: {
    type: "boolean",
  },
  inGrid: {
    control: {
      type: "boolean",
    },
  },
};

export function bannerArgsMapper<TemplateFnReturnType>(
  a: BannerArgs,
  inGrid: (children: TemplateFnReturnType) => TemplateFnReturnType,
  content: TemplateFnReturnType
): Banner<TemplateFnReturnType> {
  return {
    ...a,
    content: a.inGrid ? inGrid(content) : content,
  };
}
