import { Args } from '@storybook/addons';

import { ArgsError, StorybookParameters } from '../../stories-helpers';

import { AutosuggestArgs, autosuggestArgTypes } from './autosuggest.args';
import { fetchSuggestions } from './autosuggest.demo';
import { AutosuggestSuggestion } from './autosuggest.models';

type AutosuggestTemplateFnType<TemplateFnReturnType> = (
  fetchSuggestions: (value: string) => AutosuggestSuggestion[],
  onSelect: (event: CustomEvent<AutosuggestSuggestion>) => void,
  onChange: (event: CustomEvent<string>) => void,
  onSearch: (event: CustomEvent<string>) => void,
  suggestOnFocus: boolean,
  loading: boolean
) => TemplateFnReturnType;

export interface AutosuggestParameters<TemplateFnReturnType> {
  autosuggestDemoTemplate: AutosuggestTemplateFnType<TemplateFnReturnType>;
  autosuggestInSearchBarTemplate?: AutosuggestTemplateFnType<TemplateFnReturnType>;
}

export function storiesOfAutosuggest<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    autosuggestDemoTemplate,
    autosuggestInSearchBarTemplate
  }: AutosuggestParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Autosuggest', mainModule)
    .addParameters({
      docs: {
        page: readme,
      },
      argTypes: autosuggestArgTypes,
      args: {
        suggestOnFocus: false,
        loading: false
      },
    });

  stories.add(
    'example',
    (a: Args) => {
      const args = a as AutosuggestArgs;

      return autosuggestDemoTemplate(fetchSuggestions, args.onSelect, args.onChange, args.onSearch, args.suggestOnFocus, args.loading);
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

        return autosuggestInSearchBarTemplate(fetchSuggestions, args.onSelect, args.onChange, args.onSearch, args.suggestOnFocus, args.loading);
      }
    );
  }
}
