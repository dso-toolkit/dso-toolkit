import { ArgTypes } from "../../stories-helpers";
import { fetchSuggestions } from "./autosuggest.content";

import { Autosuggest } from "./autosuggest.models";

export interface AutosuggestArgs {
  suggestOnFocus: boolean;
}

export const autosuggestArgTypes: ArgTypes<AutosuggestArgs> = {
  suggestOnFocus: {
    control: {
      type: "boolean",
    },
  },
};

export function autosuggestArgsMapper(a: AutosuggestArgs): Autosuggest {
  return {
    fetchSuggestions: fetchSuggestions,
    suggestOnFocus: a.suggestOnFocus,
  };
}
