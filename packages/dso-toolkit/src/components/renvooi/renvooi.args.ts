import { ArgTypes } from "@storybook/types";

import { Renvooi, RenvooiValue } from "./renvooi.models.js";
import escapeStringRegexp from "escape-string-regexp";
import { isOdd, noControl } from "../../storybook";
import { HandlerFunction } from "@storybook/addon-actions";

export interface RenvooiArgs {
  voorbeeld: "was-wordt" | "toegevoegd" | "verwijderd" | "ongewijzigd";
  mark?: string;
  dsoRenvooiMarkItemHighlight: HandlerFunction;
}

export const renvooiArgs: Pick<RenvooiArgs, "voorbeeld"> = {
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
  dsoRenvooiMarkItemHighlight: {
    ...noControl,
    action: "dsoRenvooiMarkItemHighlight",
  },
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
      ? (text) =>
          text
            .split(new RegExp(`(${escapeStringRegexp(mark)})`, "gi"))
            .map((item, index) =>
              isOdd(index) ? { text: item, highlight: !highlighted && (highlighted = true) } : item,
            )
      : undefined,
    dsoRenvooiMarkItemHighlight: (e) => dsoRenvooiMarkItemHighlight(e.detail),
  };
}
