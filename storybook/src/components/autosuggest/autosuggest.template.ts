import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Autosuggest } from "./autosuggest.models.js";

export function autosuggestTemplate({
  suggestions,
  dsoSelect,
  dsoChange,
  dsoSearch,
  loading,
  loadingLabel,
  loadingDelayed,
  notFoundLabel,
  mark,
  children,
}: Autosuggest<TemplateResult>) {
  return html`
    <dso-autosuggest
      .suggestions=${suggestions}
      @dsoSelect=${dsoSelect}
      @dsoChange=${dsoChange}
      @dsoSearch=${dsoSearch}
      ?loading=${loading}
      loading-label=${ifDefined(loadingLabel)}
      loading-delayed=${ifDefined(loadingDelayed)}
      not-found-label=${ifDefined(notFoundLabel)}
      .mark=${ifDefined(mark)}
    >
      ${children}
    </dso-autosuggest>
  `;
}
