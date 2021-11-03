import { Autosuggest } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function autosuggestTemplate(
  {
    suggestions,
    onSelect,
    onChange,
    suggestOnFocus
  }: Autosuggest,
  children: TemplateResult
) {
  return html`
    <dso-autosuggest
      .suggestions=${suggestions}
      @dsoSelect=${onSelect}
      @dsoChange=${onChange}
      ?suggest-on-focus=${suggestOnFocus}
    >
      ${children}
    </dso-autosuggest>
  `;
}
