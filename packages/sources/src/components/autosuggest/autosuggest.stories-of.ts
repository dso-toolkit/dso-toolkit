import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { AutosuggestArgs, autosuggestArgTypes } from "./autosuggest.args";
import { fetchSuggestions } from "./autosuggest.demo";
import { AutosuggestSuggestion } from "./autosuggest.models";

type AutosuggestTemplateFnType<TemplateFnReturnType> = (
  fetchSuggestions: (value: string) => AutosuggestSuggestion[],
  dsoSelect: (event: CustomEvent<AutosuggestSuggestion>) => void,
  dsoChange: (event: CustomEvent<string>) => void,
  dsoSearch: (event: CustomEvent<string>) => void,
  suggestOnFocus: boolean,
  loading: boolean,
  loadingLabel: string,
  loadingDelayed: number,
  notFoundLabel: string,
  minimalCharacters?: number
) => TemplateFnReturnType;

export interface AutosuggestTemplates<TemplateFnReturnType> {
  autosuggestDemoTemplate: AutosuggestTemplateFnType<TemplateFnReturnType>;
  autosuggestInSearchBarTemplate: AutosuggestTemplateFnType<TemplateFnReturnType>;
}

export function storiesOfAutosuggest<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AutosuggestTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Autosuggest", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: autosuggestArgTypes,
      args: {
        suggestOnFocus: false,
        loading: false,
      },
    });

    stories.add(
      "example",
      templateMapper<AutosuggestArgs>((args, { autosuggestDemoTemplate }) =>
        autosuggestDemoTemplate(
          fetchSuggestions,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.suggestOnFocus,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel
        )
      )
    );

    stories.add(
      "minimal 3 characters",
      templateMapper<AutosuggestArgs>((args, { autosuggestDemoTemplate }) =>
        autosuggestDemoTemplate(
          fetchSuggestions,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.suggestOnFocus,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel,
          3
        )
      )
    );

    stories.add(
      "in searchbar",
      templateMapper<AutosuggestArgs>((args, { autosuggestInSearchBarTemplate }) =>
        autosuggestInSearchBarTemplate(
          fetchSuggestions,
          args.dsoSelect,
          args.dsoChange,
          args.dsoSearch,
          args.suggestOnFocus,
          args.loading,
          args.loadingLabel,
          args.loadingDelayed,
          args.notFoundLabel
        )
      )
    );

    return stories;
  });
}
