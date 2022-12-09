import { Autosuggest } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreAutosuggest: ComponentImplementation<Autosuggest<TemplateResult>> = {
  component: "autosuggest",
  implementation: "core",
  template: () =>
    function autosuggestTemplate({
      suggestions,
      dsoSelect,
      dsoChange,
      dsoSearch,
      suggestOnFocus,
      loading,
      loadingLabel,
      loadingDelayed,
      notFoundLabel,
      children,
    }) {
      return html`
        <dso-autosuggest
          .suggestions=${suggestions}
          @dsoSelect=${dsoSelect}
          @dsoChange=${dsoChange}
          @dsoSearch=${dsoSearch}
          ?suggest-on-focus=${suggestOnFocus}
          ?loading=${loading}
          loading-label=${ifDefined(loadingLabel)}
          loading-delayed=${ifDefined(loadingDelayed)}
          not-found-label=${ifDefined(notFoundLabel)}
        >
          ${children}
        </dso-autosuggest>
      `;
    },
};
