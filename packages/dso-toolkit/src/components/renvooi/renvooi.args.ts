import escapeStringRegexp from "escape-string-regexp";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, isOdd } from "../../storybook";

import { Renvooi, RenvooiValue } from "./renvooi.models.js";

export interface RenvooiArgs {
  voorbeeld: "was-wordt" | "toegevoegd" | "verwijderd" | "ongewijzigd";
  mark?: string;
  dsoRenvooiMarkItemHighlight: HandlerFunction;
}

export const renvooiArgs: Omit<RenvooiArgs, "mark"> = {
  dsoRenvooiMarkItemHighlight: fn(),
  voorbeeld: "was-wordt",
};

export const renvooiArgTypes: ArgTypes<RenvooiArgs> = {
  voorbeeld: {
    control: {
      type: "select",
    },
    options: ["was-wordt", "toegevoegd", "verwijderd", "ongewijzigd"],
  },
  mark: {
    control: {
      type: "text",
    },
  },
  dsoRenvooiMarkItemHighlight: argTypeAction(),
};

export function renvooiArgsMapper(a: RenvooiArgs): Renvooi {
  const { mark, dsoRenvooiMarkItemHighlight } = a;

  let highlighted = false;

  const examples: {
    [key in RenvooiArgs["voorbeeld"]]: RenvooiValue;
  } = {
    "was-wordt": {
      was: "oude waarde",
      wordt: "nieuwe waarde",
    },
    toegevoegd: {
      toegevoegd: "toegevoegd",
    },
    verwijderd: {
      verwijderd: "verwijderd",
    },
    ongewijzigd: "ongewijzigd",
  };

  return {
    value: examples[a.voorbeeld],
    mark: mark
      ? (text: string) =>
          text
            .split(new RegExp(`(${escapeStringRegexp(mark)})`, "gi"))
            .map((item, index) =>
              isOdd(index) ? { text: item, highlight: !highlighted && (highlighted = true) } : item,
            )
      : undefined,
    dsoRenvooiMarkItemHighlight: (e) => dsoRenvooiMarkItemHighlight(e.detail),
  };
}
