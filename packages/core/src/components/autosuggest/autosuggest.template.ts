import { Autosuggest } from "@dso-toolkit/sources";

import { html } from "lit-html";

export function autosuggestTemplate({
  fetchSuggestions,
  suggestOnFocus,
}: Autosuggest) {
  return html`
    <label for="autosuggestInputId">Label voor input</label>
    <dso-autosuggest
      .fetchSuggestions=${fetchSuggestions}
      ?suggest-on-focus=${suggestOnFocus}
    >
      <input id="autosuggestInputId" type="text" class="form-control" />
    </dso-autosuggest>
  `;
}
