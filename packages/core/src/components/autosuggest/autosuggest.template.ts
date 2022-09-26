import { Autosuggest } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function autosuggestTemplate(
  {
    suggestions,
    dsoSelect,
    dsoChange,
    dsoSearch,
    suggestOnFocus,
    loading,
    loadingLabel,
    loadingDelayed,
    notFoundLabel
  }: Autosuggest,
  children: TemplateResult
) {
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
}
