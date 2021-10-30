import { Autosuggest } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoAutosuggest } from "../..";

export function autosuggestTemplate({
  fetchSuggestions,
  onSelected,
  suggestOnFocus,
}: Autosuggest) {
  return (
    <>
      <label htmlFor="autosuggestInputId">Label voor input</label>
      <DsoAutosuggest
        fetchSuggestions={fetchSuggestions}
        onSelected={(e: CustomEvent<string>) => onSelected(e.detail)}
        suggest-on-focus={suggestOnFocus}
      >
        <input id="autosuggestInputId" type="text" className="form-control" />
      </DsoAutosuggest>
    </>
  );
}
