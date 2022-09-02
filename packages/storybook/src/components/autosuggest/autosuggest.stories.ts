import { storiesOfAutosuggest } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html, TemplateResult } from 'lit-html';

import { autosuggestTemplate } from "@dso-toolkit/core/src/components/autosuggest/autosuggest.template";
import readme from "@dso-toolkit/core/src/components/autosuggest/readme.md";
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

type AutosuggestConnector = (parameters: Parameters<Parameters<typeof storiesOfAutosuggest>[1]['autosuggestDemoTemplate']>) => Parameters<typeof autosuggestTemplate>[0];

const autosuggestConnector: AutosuggestConnector = ([fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel, loadingDelayed, notFoundLabel]) => ({
  suggestions: [],
  onChange: function (e) {
    onChange(e);

    if (loadingDelayed) {
      setTimeout(() => {
        this.suggestions = fetchSuggestions(e.detail);

        processSuggestions(this.suggestions);
      }, loadingDelayed + 1500);
    }
    else {
      this.suggestions = fetchSuggestions(e.detail);

      processSuggestions(this.suggestions);
    }
  },
  onSelect,
  onSearch,
  suggestOnFocus,
  loading,
  loadingLabel,
  loadingDelayed,
  notFoundLabel
});

const processSuggestions = (suggestions: any): void => {
  const suggestionsDemoPreElement = document.getElementById('suggestions-demo');
  if (suggestionsDemoPreElement) {
    suggestionsDemoPreElement.textContent = JSON.stringify(suggestions, null, 2);
  }
};

storiesOfAutosuggest<TemplateResult>(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
  },
  {
    autosuggestDemoTemplate: (fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel, loadingDelayed, notFoundLabel) => html`
      <label for="autosuggestInputId">Label voor input</label>
      ${autosuggestTemplate(
        autosuggestConnector([fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel, loadingDelayed, notFoundLabel]),
        html`
          <input id="autosuggestInputId" type="text" class="form-control">
        `)}
      <pre id="suggestions-demo">[]</pre>
    `,
    autosuggestInSearchBarTemplate: (fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel, loadingDelayed, notFoundLabel) => html`
      <div class="dso-search-bar">
        <div class="dso-search-bar-input">
          <label for="search-bar--with-value">Label</label>
          <span class="dso-search-icon" aria-hidden="true"></span>
          ${autosuggestTemplate(
            autosuggestConnector([fetchSuggestions, onSelect, onChange, onSearch, suggestOnFocus, loading, loadingLabel, loadingDelayed, notFoundLabel]),
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
