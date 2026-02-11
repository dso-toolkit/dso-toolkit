import readme from "@dso-toolkit/core/src/components/autosuggest/readme.md?raw";
import { type Meta } from "@storybook/web-components-vite";
import {
  AutosuggestArgs,
  AutosuggestSuggestion,
  AutosuggestSuggestionGroup,
  autosuggestMeta,
  autosuggestStories,
} from "dso-toolkit";
import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { templateContainer } from "../../templates";

const meta: Meta<AutosuggestArgs> = {
  ...autosuggestMeta({ readme }),
  title: "Core/Autosuggest",
};

export default meta;

const { Example, Minimal3Characters, InSearchbar, InSearchbarInvalid, WithProvidedMarkFunction, SuggestionGroups } =
  autosuggestStories({
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
        loading,
        loadingLabel,
        loadingDelayed,
        notFoundLabel,
        invalid,
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
        loading,
        loadingLabel,
        loadingDelayed,
        notFoundLabel,
        invalid,
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
          loading,
          loadingLabel,
          loadingDelayed,
          notFoundLabel,
          invalid,
          minimalCharacters,
          mark,
        ) => html`
          <div class="form-group dso-form-group-search-bar ${classMap({ "dso-invalid": !!invalid })}">
            <div class="dso-context-wrapper">
              <span class="dso-context-label">
                <label for="search-bar--with-value">Label</label>
              </span>
              <div class="dso-context-container">
                <dso-dropdown-menu class="hydrated">
                  <button type="button" id="locatie--dropdownmenu" class="dso-tertiary" slot="toggle" aria-expanded="false" aria-haspopup="menu">
                    <span>Meer zoekopties</span>
                  </button>
                  <div class="dso-dropdown-options" aria-labelledby="locatie--dropdownmenu" role="menu">
                    <ul role="group">
                      <li role="none">
                      <button type="button">Adres</button>
                      </li>
                      <li role="none">
                        <button type="button">Postcode en huisnummer</button>
                      </li>
                      <li role="none">
                        <button type="button">Kadastraal nummer</button>
                      </li>
                      <li role="none">
                        <button type="button">Coordinaten</button>
                      </li>
                      <li role="none">
                        <button type="button">Teken een gebied op de kaart</button>
                      </li>
                    </ul>
                  </div>
                </dso-dropdown-menu>
              </div>
            </div>
            <div class="dso-field-container">
              <div class="dso-search-bar ${classMap({ "dso-invalid": !!invalid })}">
                  <div class="dso-search-bar-input">
                    <span class="dso-search-icon" aria-hidden="true"></span>
                    ${autosuggestTemplate({
                      ...autosuggestConnector([
                        fetchSuggestions,
                        dsoSelect,
                        dsoChange,
                        dsoSearch,
                        loading,
                        loadingLabel,
                        loadingDelayed,
                        notFoundLabel,
                        invalid,
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
                ${
                  invalid
                    ? html`<p class="dso-message" role="alert" id="mijn-id-error-text">
                        Er zijn geen resultaten gevonden.
                      </p>`
                    : nothing
                }
              </div>
            </div>
          </div>
        `,
      };
    },
  });

export { Example, InSearchbar, InSearchbarInvalid, Minimal3Characters, SuggestionGroups, WithProvidedMarkFunction };
