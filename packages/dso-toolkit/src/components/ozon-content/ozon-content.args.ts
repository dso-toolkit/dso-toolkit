import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { OzonContent } from "./ozon-content.models.js";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  dsoAnchorClick: HandlerFunction;
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
  dsoAnchorClick: {
    ...noControl,
    action: "dsoAnchorClick",
  },
};

export function ozonContentArgsMapper(a: OzonContentArgs): OzonContent {
  return {
    ...a,
    dsoAnchorClick: (e) => a.dsoAnchorClick(e.detail),
  };
}
