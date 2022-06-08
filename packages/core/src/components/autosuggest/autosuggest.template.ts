import { Autosuggest } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function autosuggestTemplate(
  {
    suggestions,
    onSelect,
    onChange,
    onSearch,
    suggestOnFocus,
    loading,
    loadingLabel
  }: Autosuggest,
  children: TemplateResult
) {
  return html`
    <dso-autosuggest
      .suggestions=${suggestions}
      @dsoSelect=${onSelect}
      @dsoChange=${onChange}
      @dsoSearch=${onSearch}
      ?suggest-on-focus=${suggestOnFocus}
      ?loading=${loading}
      loading-label=${ifDefined(loadingLabel)}
    >
      ${children}
    </dso-autosuggest>
  `;
}
