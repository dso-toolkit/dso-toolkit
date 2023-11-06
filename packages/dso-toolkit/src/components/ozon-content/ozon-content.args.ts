import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { OzonContent } from "./ozon-content.models.js";
import escapeStringRegexp from "escape-string-regexp";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  mark?: string;
  highlight?: boolean;
  dsoAnchorClick: HandlerFunction;
  dsoOzonContentMarkItemHighlight: HandlerFunction;
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
  mark: {
    control: {
      type: "text",
    },
  },
  highlight: {
    control: {
      type: "boolean",
    },
  },
  dsoAnchorClick: {
    ...noControl,
    action: "dsoAnchorClick",
  },
  dsoOzonContentMarkItemHighlight: {
    ...noControl,
    action: "dsoOzonContentMarkItemHighlight",
  },
};

export function ozonContentArgsMapper(args: OzonContentArgs): OzonContent {
  const { mark, content, dsoAnchorClick, dsoOzonContentMarkItemHighlight, inline, highlight } = args;
  let highlighted = false;

  return {
    content,
    inline,
    mark: mark
      ? (text: string) =>
          text
            .split(new RegExp(`(${escapeStringRegexp(mark)})`, "gi"))
            .map((item, index) =>
              isOdd(index)
                ? { text: item, highlight: !!highlight && index === 1 && !highlighted && (highlighted = true) }
                : item
            )
      : undefined,
    dsoOzonContentMarkItemHighlight: (e) => dsoOzonContentMarkItemHighlight(e.detail),
    dsoAnchorClick: (e) => dsoAnchorClick(e.detail),
  };
}

function isOdd(n: number): boolean {
  return Math.abs(n % 2) === 1;
}
