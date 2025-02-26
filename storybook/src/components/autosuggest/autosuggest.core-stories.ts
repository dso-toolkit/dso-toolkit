import { type Meta } from "@storybook/web-components";
import {
  AutosuggestArgs,
  autosuggestMeta,
  autosuggestStories,
  AutosuggestSuggestion,
  AutosuggestSuggestionGroup,
} from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/autosuggest/readme.md?raw";
import { html } from "lit-html";

const meta: Meta<AutosuggestArgs> = {
  ...autosuggestMeta({ readme }),
  title: "Core/Autosuggest",
};

export default meta;

const { Example, Minimal3Characters, InSearchbar, WithProvidedMarkFunction, SuggestionGroups } = autosuggestStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { autosuggestTemplate, buttonTemplate } = templates;

    type AutosuggestConnector = (
      parameters: Parameters<
        ReturnType<Parameters<typeof autosuggestStories>[0]["storyTemplates"]>["autosuggestDemoTemplate"]
      >,
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
      mark,
    ]) => ({
      children: html`<input id="autosuggestInputId" type="text" class="form-control" />`,
      suggestions: null,
      dsoChange(e) {
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
      mark,
    });

    const processSuggestions = (suggestions: AutosuggestSuggestion[] | AutosuggestSuggestionGroup[] | null): void => {
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
        minimalCharacters,
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
          ]),
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
        notFoundLabel,
        minimalCharacters,
        mark,
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
                minimalCharacters,
                mark,
              ]),
              children: html`<input
                type="text"
                id="search-bar--with-value"
                placeholder="Bijvoorbeeld 'Rotterdam' of 'Groningen' of 'suggestie' (voor meer dan 10 suggesties)"
              />`,
            })}
            <button type="button">Zoekopdracht legen</button>
          </div>
          ${buttonTemplate({ label: "Button", variant: "secondary", type: "button" })}
        </div>
      `,
    };
  },
});

export { Example, Minimal3Characters, InSearchbar, WithProvidedMarkFunction, SuggestionGroups };
