import { Autosuggest } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoAutosuggest } from "../..";

export function autosuggestTemplate({
  fetchSuggestions,
  suggestOnFocus,
}: Autosuggest) {
  return (
    <>
      <label htmlFor="autosuggestInputId">Label voor input</label>
      <DsoAutosuggest
        fetchSuggestions={fetchSuggestions}
        suggest-on-focus={suggestOnFocus}
      >
        <input id="autosuggestInputId" type="text" className="form-control" />
      </DsoAutosuggest>
    </>
  );
}
