import { ArgTypes } from "@storybook/types";

import { Renvooi, RenvooiValue } from "./renvooi.models.js";

export interface RenvooiArgs {
  voorbeeld: "was-wordt" | "toegevoegd" | "verwijderd" | "ongewijzigd";
}

export const renvooiArgs: RenvooiArgs = {
  voorbeeld: "was-wordt",
};

export const renvooiArgTypes: ArgTypes<RenvooiArgs> = {
  voorbeeld: {
    control: {
      type: "select",
    },
    options: ["was-wordt", "toegevoegd", "verwijderd", "ongewijzigd"],
  },
};

export function renvooiArgsMapper(a: RenvooiArgs): Renvooi {
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
  };
}
