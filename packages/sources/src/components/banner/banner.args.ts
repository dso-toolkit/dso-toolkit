import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes } from "../../storybook";

import { Banner } from "./banner.models";

export interface BannerArgs {
  status: string;
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
