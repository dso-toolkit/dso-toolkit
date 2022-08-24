import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes, noControl } from "../../storybook";

import { OzonContent } from "./ozon-content.models";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  interactive?: boolean;
  deleted?: boolean;
  prefix?: string;
  suffix?: string;
  onAnchorClick: HandlerFunction;
  onClick: HandlerFunction;
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
  interactive: {
    control: {
      type: 'boolean'
    }
  },
  deleted: {
    control: {
      type: 'boolean'
    }
  },
  prefix: {
    control: {
      type: 'text'
    }
  },
  suffix: {
    control: {
      type: 'text'
    }
  },
  onAnchorClick: {
    ...noControl,
    action: "anchorClick",
  },
  onClick: {
    ...noControl,
    action: 'onClick'
  }
};

export function ozonContentArgsMapper(a: OzonContentArgs): OzonContent {
  return {
    content: a.content,
    inline: a.inline,
    interactive: a.interactive,
    deleted: a.deleted,
    prefix: a.prefix || undefined,
    suffix: a.suffix || undefined,
    onAnchorClick: (e: any) => a.onAnchorClick(e.detail),
    onClick: a.onClick
  };
}
