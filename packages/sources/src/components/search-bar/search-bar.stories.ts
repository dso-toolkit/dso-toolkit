import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { SearchBarArgs, searchBarArgsMapper, searchBarArgTypes } from './search-bar.args';
import { SearchBar } from './search-bar.models';

export interface SearchBarParameters<TemplateFnReturnType> {
  searchBarTemplate: (searchBarProperties: SearchBar) => TemplateFnReturnType;
}

export function storiesOfSearchBar<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    searchBarTemplate
  }: SearchBarParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(searchBarArgsMapper, searchBarTemplate);

  const stories = storiesOf('SearchBar', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: componentArgs<SearchBarArgs>({
        id: 'search-bar-id',
        label: 'Label',
        icon: true,
        hiddenLabel: false,
        invalid: false,
        placeholder: 'Bv. boomkap',
        value: '',
        buttonLabel: 'Zoeken',
        hideSearchButton: false,
        ariaDescribedBy: '',
        resultsMessage: '',
        resultsHidden: false
      }),
      argTypes: searchBarArgTypes
    });

  stories.add(
    'visual label with icon',
    template
  );

  stories.add(
    'visual label without icon',
    template,
    {
      args: {
        icon: false
      }
    }
  );

  stories.add(
    'placeholder with long text',
    template,
    {
      args: {
        placeholder: 'Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text.'
      }
    }
  );

  stories.add(
    'hidden label with icon',
    template,
    {
      args: {
        hiddenLabel: true,
        icon: true
      }
    }
  );

  stories.add(
    'hidden label without icon',
    template,
    {
      args: {
        hiddenLabel: true,
        icon: false
      }
    }
  );

  stories.add(
    'with value',
    template,
    {
      args: {
        value: 'Laan van Eik en Duinen 155'
      }
    }
  );

  stories.add(
    'invalid',
    template,
    {
      args: {
        invalid: true
      }
    }
  );

  stories.add(
    'hidden button',
    template,
    {
      args: {
        hideSearchButton: true
      }
    }
  );

  stories.add(
    'with results message',
    template,
    {
      args: {
        resultsMessage: '7 gevonden resultaten'
      }
    }
  );

  stories.add(
    'with hidden results message',
    template,
    {
      args: {
        resultsMessage: '7 gevonden resultaten',
        resultsHidden: true
      }
    }
  );
}
