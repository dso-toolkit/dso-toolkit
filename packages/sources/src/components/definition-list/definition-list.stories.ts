import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { definitionListArgsMapper, definitionListArgTypes } from './definition-list.args';
import { columnDefinitions, definitions, smallContentDefinitions } from './definition-list.content';
import { DefinitionList } from './definition-list.models';

export interface DefinitionListParameters<TemplateFnReturnType> {
  definitionListTemplate: (definitionListProperties: DefinitionList) => TemplateFnReturnType;
}

export function storiesOfDefinitionList<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    definitionListTemplate
  }: DefinitionListParameters<TemplateFnReturnType>
) {
  const stories = storiesOf('Definition List', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        definitions
      },
      argTypes: definitionListArgTypes
    });

  stories.add(
    'default',
    bindTemplate(definitionListArgsMapper, definitionListTemplate)
  );

  stories.add(
    'vertical',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-vertical'
      }
    }
  );

  stories.add(
    'emphasize description',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-emphasize-description'
      }
    }
  );

  stories.add(
    'vertical with emphasized description',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-vertical dso-emphasize-description'
      }
    }
  );

  stories.add(
    'columns 1-3',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-columns-1-3 dso-with-header',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'columns 2-2',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-columns-2-2 dso-with-header',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'columns 3-1',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-columns-3-1',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'two columns small-content',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-columns dso-2-columns',
        definitions: smallContentDefinitions
      }
    }
  );

  stories.add(
    'two columns',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-columns dso-2-columns'
      }
    }
  );

  stories.add(
    'three columns small-content',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-columns dso-3-columns',
        definitions: smallContentDefinitions
      }
    }
  );

  stories.add(
    'three columns',
    bindTemplate(definitionListArgsMapper, definitionListTemplate),
    {
      args: {
        modifier: 'dso-columns dso-3-columns'
      }
    }
  );
}
