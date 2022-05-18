import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes, noControl } from "../../stories-helpers";

import { OzonContent } from "./ozon-content.models";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  deleted: boolean;
  onAnchorClick: HandlerFunction;
}

export const ozonContentArgTypes: ArgTypes<OzonContentArgs> = {
  content: {
    control: {
      type: 'text'
    }
  },
  inline: {
    control: {
      type: 'boolean'
    }
  },
  deleted: {
    control: {
      type: 'boolean'
    }
  },
  onAnchorClick: {
    ...noControl,
    action: "anchorClick",
  },
};

export function ozonContentArgsMapper(a: OzonContentArgs): OzonContent {
  return {
    content: a.content,
    inline: a.inline,
    deleted: a.deleted,
    onAnchorClick: (e: any) => a.onAnchorClick(e.detail),
  };
}
