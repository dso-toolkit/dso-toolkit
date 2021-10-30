import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes } from "../../stories-helpers";

import { fetchSuggestions } from "./autosuggest.content";
import { Autosuggest } from "./autosuggest.models";

export interface AutosuggestArgs {
  suggestOnFocus: boolean;
  onSelected: HandlerFunction;
}

export const autosuggestArgTypes: ArgTypes<AutosuggestArgs> = {
  suggestOnFocus: {
    control: {
      type: "boolean",
    },
  },
  onSelected: {
    action: 'onSelected'
  }
};

export function autosuggestArgsMapper(a: AutosuggestArgs): Autosuggest {
  return {
    fetchSuggestions: fetchSuggestions,
    onSelected: a.onSelected,
    suggestOnFocus: a.suggestOnFocus,
  };
}
