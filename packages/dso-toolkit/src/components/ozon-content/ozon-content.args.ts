import escapeStringRegexp from "escape-string-regexp";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction, isOdd } from "../../storybook";

import { begripResolver } from "./ozon-content.content";
import { OzonContent, OzonContentBegripResolver, OzonContentUrlResolver } from "./ozon-content.models.js";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  mark?: string;
  highlight?: boolean;
  dsoClick: HandlerFunction;
  dsoOzonContentMarkItemHighlight: HandlerFunction;
  urlResolver?: OzonContentUrlResolver;
  begripResolver?: OzonContentBegripResolver;
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
  dsoClick: argTypeAction(),
  dsoOzonContentMarkItemHighlight: argTypeAction(),
  urlResolver: argTypeAction(),
  begripResolver: argTypeAction(),
};

export function ozonContentArgsMapper(args: OzonContentArgs): OzonContent {
  const { mark, content, dsoClick, dsoOzonContentMarkItemHighlight, inline, highlight } = args;
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
    dsoClick: (e) => dsoClick(e.detail),
    urlResolver: (name, attribute, value, element) => {
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

      if (name === "IntIoRef" && attribute === "ref" && element) {
        return `https://identifier-eto.overheid.nl//join/id/regdata/gm1979/2021/Delfzijlkamerverhuur/nld@2021-08-02;1`;
      }

      return value;
    },
    begripResolver,
  };
}
