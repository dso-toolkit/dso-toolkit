import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { isOdd, noControl } from "../../storybook";

import { OzonContent, OzonContentUrlResolver } from "./ozon-content.models.js";
import escapeStringRegexp from "escape-string-regexp";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  mark?: string;
  highlight?: boolean;
  dsoAnchorClick: HandlerFunction;
  dsoOzonContentMarkItemHighlight: HandlerFunction;
  urlResolver?: OzonContentUrlResolver;
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
  urlResolver: {
    ...noControl,
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
                : item,
            )
      : undefined,
    dsoOzonContentMarkItemHighlight: (e) => dsoOzonContentMarkItemHighlight(e.detail),
    dsoAnchorClick: (e) => dsoAnchorClick(e.detail),
    urlResolver: (
      name: "Illustratie" | "InlineTekstAfbeelding" | "ExtIoRef" | "ExtRef",
      attribute: "naam" | "ref",
      value: string | null,
      element: Element,
    ) => {
      if (!value) {
        return "";
      }

      if (name === "Illustratie" && attribute === "naam" && element) {
        return `images/${value}`;
      }

      if (name === "ExtRef" && attribute === "ref" && element) {
        return `https://wetten.overheid.nl/${value}`;
      }

      if (name === "ExtIoRef" && attribute === "ref" && element) {
        return `https://identifier-eto.overheid.nl/${value}`;
      }

      return value;
    },
  };
}
