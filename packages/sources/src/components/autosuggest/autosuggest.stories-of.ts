import { Args } from '@storybook/addons';

import { ArgsError, createStories, StorybookParameters } from '../../storybook';

import { AutosuggestArgs, autosuggestArgTypes } from './autosuggest.args';
import { fetchSuggestions } from './autosuggest.demo';
import { AutosuggestSuggestion } from './autosuggest.models';

type AutosuggestTemplateFnType<TemplateFnReturnType> = (
  fetchSuggestions: (value: string) => AutosuggestSuggestion[],
  onSelect: (event: CustomEvent<AutosuggestSuggestion>) => void,
  onChange: (event: CustomEvent<string>) => void,
  onSearch: (event: CustomEvent<string>) => void,
  suggestOnFocus: boolean,
  loading: boolean,
  loadingLabel: string,
  loadingDelayed: number,
  notFoundLabel: string,
  minimalCharacters?: number,
) => TemplateFnReturnType;

export interface AutosuggestParameters<TemplateFnReturnType> {
  autosuggestDemoTemplate: AutosuggestTemplateFnType<TemplateFnReturnType>;
  autosuggestInSearchBarTemplate?: AutosuggestTemplateFnType<TemplateFnReturnType>;
}

export function storiesOfAutosuggest<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    autosuggestDemoTemplate,
    autosuggestInSearchBarTemplate
  }: AutosuggestParameters<TemplateFnReturnType>
) {
  const stories = createStories('Autosuggest', parameters, autosuggestArgTypes)
    .addParameters({
      args: {
        suggestOnFocus: false,
        loading: false
      }
    });

  stories.add(
    'example',
    (a: Args) => {
      const args = a as AutosuggestArgs;

      return autosuggestDemoTemplate(fetchSuggestions, args.onDsoSelect, args.onDsoChange, args.onDsoSearch, args.suggestOnFocus, args.loading, args.loadingLabel, args.loadingDelayed, args.notFoundLabel);
    }
  );

  stories.add(
    'minimal 3 characters',
    (a: Args) => {
      const args = a as AutosuggestArgs;

      return autosuggestDemoTemplate(fetchSuggestions, args.onSelect, args.onChange, args.onSearch, args.suggestOnFocus, args.loading, args.loadingLabel, args.loadingDelayed, args.notFoundLabel, 3);
    }
  );

  if (autosuggestInSearchBarTemplate) {
    stories.add(
      'in searchbar',
      (a: Args | undefined) => {
        if (!a) {
          throw new ArgsError();
        }

        const args = a as AutosuggestArgs;

        return autosuggestInSearchBarTemplate(fetchSuggestions, args.onDsoSelect, args.onDsoChange, args.onDsoSearch, args.suggestOnFocus, args.loading, args.loadingLabel, args.loadingDelayed, args.notFoundLabel);
      }
    );
  }
}
