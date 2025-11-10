import escapeStringRegexp from "escape-string-regexp";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction, isOdd } from "../../storybook";

import { begripResolver } from "./ozon-content.content";
import { OzonContent, OzonContentBegripResolver, OzonContentUrlResolver } from "./ozon-content.models.js";

export interface OzonContentArgs {
  content: string;
  inline: boolean;
  searchTerm?: string;
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
  searchTerm: {
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

export function ozonContentArgsMapper(a: OzonContentArgs): OzonContent {
  const { searchTerm, content, dsoClick, dsoOzonContentMarkItemHighlight, inline, highlight } = a;
  let highlighted = false;

  return {
    content,
    inline,
    mark: searchTerm
      ? (text: string) =>
          text
            .split(new RegExp(`(${escapeStringRegexp(searchTerm)})`, "gi"))
            .map((item, index) =>
              isOdd(index)
                ? { text: item, highlight: !!highlight && index === 1 && !highlighted && (highlighted = true) }
                : item,
            )
      : undefined,
    dsoOzonContentMarkItemHighlight: (e) => dsoOzonContentMarkItemHighlight(e.detail),
    dsoClick: (e) => {
      if (e.detail.type === "IntRef" && !e.detail.isModifiedEvent) {
        e.detail.originalEvent.preventDefault();
      }

      dsoClick(e.detail);
    },
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
        return `#${value}`;
      }

      return value;
    },
    begripResolver,
  };
}
