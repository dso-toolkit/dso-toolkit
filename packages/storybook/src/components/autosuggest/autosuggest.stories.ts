import { AutosuggestSuggestion, storiesOfAutosuggest } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "@dso-toolkit/core/src/components/autosuggest/readme.md";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";

storiesOfAutosuggest({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ autosuggestTemplate }) => {
    type AutosuggestConnector = (
      parameters: Parameters<
        ReturnType<Parameters<typeof storiesOfAutosuggest>[0]["storyTemplates"]>["autosuggestDemoTemplate"]
      >
    ) => Parameters<typeof autosuggestTemplate>[0];

    const autosuggestConnector: AutosuggestConnector = ([
      fetchSuggestions,
      dsoSelect,
      dsoChange,
      dsoSearch,
      suggestOnFocus,
      loading,
      loadingLabel,
      loadingDelayed,
      notFoundLabel,
      minimalCharacters = 1,
    ]) => ({
      children: html`<input id="autosuggestInputId" type="text" class="form-control" />`,
      suggestions: null,
      dsoChange: function (e) {
        dsoChange(e);

        if (loadingDelayed) {
          setTimeout(() => {
            this.suggestions = fetchSuggestions(e.detail);

            processSuggestions(this.suggestions);
          }, loadingDelayed + 1500);
        } else {
          if (e.detail.length >= minimalCharacters) {
            this.suggestions = fetchSuggestions(e.detail);
          } else {
            this.suggestions = null;
          }

          processSuggestions(this.suggestions);
        }
      },
      dsoSelect,
      dsoSearch,
      suggestOnFocus,
      loading,
      loadingLabel,
      loadingDelayed,
      notFoundLabel,
    });

    const processSuggestions = (suggestions: AutosuggestSuggestion[] | null): void => {
      const suggestionsDemoPreElement = document.getElementById("suggestions-demo");
      if (suggestionsDemoPreElement) {
        suggestionsDemoPreElement.textContent = JSON.stringify(suggestions, null, 2);
      }
    };

    return {
      autosuggestDemoTemplate: (
        fetchSuggestions,
        dsoSelect,
        dsoChange,
        dsoSearch,
        suggestOnFocus,
        loading,
        loadingLabel,
        loadingDelayed,
        notFoundLabel,
        minimalCharacters
      ) => html`
        <label for="autosuggestInputId">Label voor input</label>
        ${autosuggestTemplate(
          autosuggestConnector([
            fetchSuggestions,
            dsoSelect,
            dsoChange,
            dsoSearch,
            suggestOnFocus,
            loading,
            loadingLabel,
            loadingDelayed,
            notFoundLabel,
            minimalCharacters,
          ])
        )}
        <pre id="suggestions-demo">null</pre>
      `,
      autosuggestInSearchBarTemplate: (
        fetchSuggestions,
        dsoSelect,
        dsoChange,
        dsoSearch,
        suggestOnFocus,
        loading,
        loadingLabel,
        loadingDelayed,
        notFoundLabel
      ) => html`
        <div class="dso-search-bar">
          <div class="dso-search-bar-input">
            <label for="search-bar--with-value">Label</label>
            <span class="dso-search-icon" aria-hidden="true"></span>
            ${autosuggestTemplate({
              ...autosuggestConnector([
                fetchSuggestions,
                dsoSelect,
                dsoChange,
                dsoSearch,
                suggestOnFocus,
                loading,
                loadingLabel,
                loadingDelayed,
                notFoundLabel,
              ]),
              children: html`<input type="text" id="search-bar--with-value" placeholder="Bijvoorbeeld 'Rotterdam'" />`,
            })}
            <button type="button">Zoekopdracht legen</button>
          </div>
          <button type="button" class="dso-secondary">Button</button>
        </div>
      `,
    };
  },
});
