import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes, noControl } from "../../stories-helpers";

import { OzonContent } from "./ozon-content.models";

export interface OzonContentArgs {
  content: string;
  onAnchorClick: HandlerFunction;
}

export const ozonContentArgTypes: ArgTypes<OzonContentArgs> = {
  content: noControl,
  onAnchorClick: {
    ...noControl,
    action: "anchorClick",
  },
};

export function ozonContentArgsMapper(a: OzonContentArgs): OzonContent {
  return {
    content: a.content,
    onAnchorClick: (e: any) => a.onAnchorClick(e.detail),
  };
}
