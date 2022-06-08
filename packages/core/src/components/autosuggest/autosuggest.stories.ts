import { storiesOfAutosuggest } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html, TemplateResult } from 'lit-html';

import { autosuggestTemplate } from "./autosuggest.template";
import readme from "./readme.md";

type AutosuggestConnector = (parameters: Parameters<Parameters<typeof storiesOfAutosuggest>[1]['autosuggestDemoTemplate']>) => Parameters<typeof autosuggestTemplate>[0];

const autosuggestConnector: AutosuggestConnector = ([fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel]) => ({
  suggestions: [],
  onChange: function (e) {
    onChange(e);

    this.suggestions = fetchSuggestions(e.detail);

    const suggestionsDemoPreElement = document.getElementById('suggestions-demo');
    if (suggestionsDemoPreElement) {
      suggestionsDemoPreElement.textContent = JSON.stringify(this.suggestions, null, 2);
    }
  },
  onSelect,
  onSearch,
  suggestOnFocus,
  loading,
  loadingLabel
})

storiesOfAutosuggest<TemplateResult>(
  {
    module,
    storiesOf,
    readme,
  },
  {
    autosuggestDemoTemplate: (fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel) => html`
      <label for="autosuggestInputId">Label voor input</label>
      ${autosuggestTemplate(
        autosuggestConnector([fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel]),
        html`
          <input id="autosuggestInputId" type="text" class="form-control">
        `)}
      <pre id="suggestions-demo">[]</pre>
    `,
    autosuggestInSearchBarTemplate: (fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel) => html`
      <div class="dso-search-bar">
        <div class="dso-search-bar-input">
          <label for="search-bar--with-value">Label</label>
          <span class="dso-search-icon" aria-hidden="true"></span>
          ${autosuggestTemplate(
            autosuggestConnector([fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel]),
            html`
            <input type="text" id="search-bar--with-value" placeholder="Bijvoorbeeld 'Rotterdam'">
          `)}
          <button type="button">
            Zoekopdracht legen
          </button>
        </div>
        <button type="button" class="dso-secondary">
          Button
        </button>
      </div>
    `
  }
);
