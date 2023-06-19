import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { OzonContent } from "./ozon-content.models.js";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  interactive: string | boolean;
  deleted: boolean;
  prefix?: string;
  suffix?: string;
  dsoAnchorClick: HandlerFunction;
  dsoClick: HandlerFunction;
}

export const ozonContentArgTypes: ArgTypes<OzonContentArgs> = {
  content: {
    control: {
      type: "text",
    },
  },
  inline: {
    control: {
      type: "boolean",
    },
  },
  interactive: {
    options: ["default", "sub"],
    control: {
      type: "select",
    },
  },
  deleted: {
    control: {
      type: "boolean",
    },
  },
  prefix: {
    control: {
      type: "text",
    },
  },
  suffix: {
    control: {
      type: "text",
    },
  },
  dsoAnchorClick: {
    ...noControl,
    action: "dsoAnchorClick",
  },
  dsoClick: {
    ...noControl,
    action: "dsoClick",
  },
};

export function ozonContentArgsMapper<TemplateFnReturnType>(
  a: OzonContentArgs,
  prefix?: TemplateFnReturnType,
  suffix?: TemplateFnReturnType
): OzonContent<TemplateFnReturnType> {
  return {
    ...a,
    prefix: a.prefix || prefix,
    suffix: a.suffix || suffix,
    interactive: a.interactive === "sub" ? "sub" : a.interactive === "default",
    dsoAnchorClick: (e) => a.dsoAnchorClick(e.detail),
  };
}
