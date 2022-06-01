import { Autosuggest } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function autosuggestTemplate(
  {
    suggestions,
    onSelect,
    onChange,
    onSearch,
    suggestOnFocus,
    loading
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
    >
      ${children}
    </dso-autosuggest>
  `;
}
