import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes } from "../../storybook/index.js";

import { Banner } from "./banner.models.js";

export interface BannerArgs {
  status: "warning" | "danger";
  onClick: HandlerFunction;
}

export const bannerArgTypes: ArgTypes<BannerArgs> = {
  status: {
    options: ["warning", "danger"],
    control: {
      type: "select",
    },
  },
  onClick: {
    action: "closed",
  },
};

export function bannerArgsMapper<TemplateFnReturnType>(
  a: BannerArgs,
  content: TemplateFnReturnType
): Banner<TemplateFnReturnType> {
  return {
    onClick: (e: Event) => a.onClick(e),
    content,
    status: a.status,
  };
}
