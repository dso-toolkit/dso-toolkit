import readme from "@dso-toolkit/core/src/components/autosuggest/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";
import { buttonTemplate } from "../button/button.template.js";

import { AutosuggestArgs, autosuggestArgTypes } from "./autosuggest.args.js";
import { fetchSuggestionGroups, fetchSuggestions, mark } from "./autosuggest.demo.js";
import { AutosuggestSuggestion, AutosuggestSuggestionGroup } from "./autosuggest.models.js";
import { autosuggestTemplate } from "./autosuggest.template.js";

type AutosuggestStory = StoryObj<AutosuggestArgs, Renderer>;
type AutosuggestConnector = (
  parameters: [
    (value: string) => AutosuggestSuggestion[] | AutosuggestSuggestionGroup[],
    AutosuggestArgs["dsoSelect"],
    AutosuggestArgs["dsoChange"],
    AutosuggestArgs["dsoSearch"],
    AutosuggestArgs["loading"],
    AutosuggestArgs["loadingLabel"],
    AutosuggestArgs["loadingDelayed"],
    AutosuggestArgs["notFoundLabel"],
    number?,
    Parameters<typeof autosuggestTemplate>[0]["mark"]?,
  ],
) => Parameters<typeof autosuggestTemplate>[0];

const meta: Meta<AutosuggestArgs> = {
  title: "Core/Autosuggest",
  argTypes: autosuggestArgTypes,
  args: {
    dsoSelect: fn(),
    dsoChange: fn(),
    dsoSearch: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const autosuggestConnector: AutosuggestConnector = ([
  fetchSuggestionsFn,
  dsoSelect,
  dsoChange,
  dsoSearch,
  loading,
  loadingLabel,
  loadingDelayed,
  notFoundLabel,
  minimalCharacters = 1,
  markFn,
]) => ({
  children: html`<input id="autosuggestInputId" type="text" class="form-control" />`,
  suggestions: null,
  dsoChange(e) {
    dsoChange(e);

    if (loadingDelayed) {
      setTimeout(() => {
        this.suggestions = fetchSuggestionsFn(e.detail);

        processSuggestions(this.suggestions);
      }, loadingDelayed + 1500);
    } else {
      if (e.detail.length >= minimalCharacters) {
        this.suggestions = fetchSuggestionsFn(e.detail);
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
  mark: markFn,
});

const processSuggestions = (suggestions: AutosuggestSuggestion[] | AutosuggestSuggestionGroup[] | null): void => {
  const suggestionsDemoPreElement = document.getElementById("suggestions-demo");
  if (suggestionsDemoPreElement) {
    suggestionsDemoPreElement.textContent = JSON.stringify(suggestions, null, 2);
  }
};

function autosuggestDemoTemplate(
  fetchSuggestionsFn: (value: string) => AutosuggestSuggestion[] | AutosuggestSuggestionGroup[],
  dsoSelect: AutosuggestArgs["dsoSelect"],
  dsoChange: AutosuggestArgs["dsoChange"],
  dsoSearch: AutosuggestArgs["dsoSearch"],
  loading: AutosuggestArgs["loading"],
  loadingLabel: AutosuggestArgs["loadingLabel"],
  loadingDelayed: AutosuggestArgs["loadingDelayed"],
  notFoundLabel: AutosuggestArgs["notFoundLabel"],
  minimalCharacters?: number,
) {
  return html`
    <label for="autosuggestInputId">Label voor input</label>
    ${autosuggestTemplate(
      autosuggestConnector([
        fetchSuggestionsFn,
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
  `;
}

function autosuggestInSearchBarTemplate(
  fetchSuggestionsFn: (value: string) => AutosuggestSuggestion[] | AutosuggestSuggestionGroup[],
  dsoSelect: AutosuggestArgs["dsoSelect"],
  dsoChange: AutosuggestArgs["dsoChange"],
  dsoSearch: AutosuggestArgs["dsoSearch"],
  loading: AutosuggestArgs["loading"],
  loadingLabel: AutosuggestArgs["loadingLabel"],
  loadingDelayed: AutosuggestArgs["loadingDelayed"],
  notFoundLabel: AutosuggestArgs["notFoundLabel"],
  minimalCharacters?: number,
  markFn?: Parameters<typeof autosuggestTemplate>[0]["mark"],
) {
  return html`
    <div class="dso-search-bar">
      <div class="dso-search-bar-input">
        <label for="search-bar--with-value">Label</label>
        <span class="dso-search-icon" aria-hidden="true"></span>
        ${autosuggestTemplate({
          ...autosuggestConnector([
            fetchSuggestionsFn,
            dsoSelect,
            dsoChange,
            dsoSearch,
            loading,
            loadingLabel,
            loadingDelayed,
            notFoundLabel,
            minimalCharacters,
            markFn,
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
  `;
}

export const Example: AutosuggestStory = {
  render: (args: AutosuggestArgs) =>
    autosuggestDemoTemplate(
      fetchSuggestions,
      args.dsoSelect,
      args.dsoChange,
      args.dsoSearch,
      args.loading,
      args.loadingLabel,
      args.loadingDelayed,
      args.notFoundLabel,
    ),
};

export const Minimal3Characters: AutosuggestStory = {
  render: (args: AutosuggestArgs) =>
    autosuggestDemoTemplate(
      fetchSuggestions,
      args.dsoSelect,
      args.dsoChange,
      args.dsoSearch,
      args.loading,
      args.loadingLabel,
      args.loadingDelayed,
      args.notFoundLabel,
      3,
    ),
};

export const InSearchbar: AutosuggestStory = {
  render: (args: AutosuggestArgs) =>
    autosuggestInSearchBarTemplate(
      fetchSuggestions,
      args.dsoSelect,
      args.dsoChange,
      args.dsoSearch,
      args.loading,
      args.loadingLabel,
      args.loadingDelayed,
      args.notFoundLabel,
    ),
};

export const WithProvidedMarkFunction: AutosuggestStory = {
  render: (args: AutosuggestArgs) =>
    autosuggestInSearchBarTemplate(
      fetchSuggestions,
      args.dsoSelect,
      args.dsoChange,
      args.dsoSearch,
      args.loading,
      args.loadingLabel,
      args.loadingDelayed,
      args.notFoundLabel,
      undefined,
      mark,
    ),
};

export const SuggestionGroups: AutosuggestStory = {
  render: (args: AutosuggestArgs) =>
    autosuggestDemoTemplate(
      fetchSuggestionGroups,
      args.dsoSelect,
      args.dsoChange,
      args.dsoSearch,
      args.loading,
      args.loadingLabel,
      args.loadingDelayed,
      args.notFoundLabel,
    ),
};
