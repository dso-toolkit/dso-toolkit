import { Autosuggest } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
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
      loading,
      loadingLabel,
      loadingDelayed,
      notFoundLabel,
      mark,
      children,
    }) {
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
    },
};
