import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes, noControl } from "../../storybook";

import { OzonContent } from "./ozon-content.models";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  interactive?: string | boolean;
  deleted?: boolean;
  prefix?: string;
  suffix?: string;
  onDsoAnchorClick: HandlerFunction;
  onDsoClick: HandlerFunction;
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
    options: [
      'default',
      'sub',
      undefined
    ],
    control: {
      type: 'select'
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
  onDsoAnchorClick: {
    ...noControl,
    action: "onDsoAnchorClick",
  },
  onDsoClick: {
    ...noControl,
    action: 'onDsoClick'
  }
};

export function ozonContentArgsMapper(a: OzonContentArgs): OzonContent {
  return {
    content: a.content,
    inline: a.inline,
    interactive: a.interactive === 'sub' ? 'sub' : a.interactive === 'default',
    deleted: a.deleted,
    prefix: a.prefix || undefined,
    suffix: a.suffix || undefined,
    onAnchorClick: (e: any) => a.onDsoAnchorClick(e.detail),
    onClick: a.onDsoClick
  };
}
