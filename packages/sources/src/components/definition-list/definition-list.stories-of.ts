import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { definitionListArgsMapper, definitionListArgTypes } from './definition-list.args';
import { listDefinitions, columnDefinitions, definitions, smallContentDefinitions } from './definition-list.content';
import { DefinitionList } from './definition-list.models';

export interface DefinitionListParameters<TemplateFnReturnType> {
  definitionListTemplate: (definitionListProperties: DefinitionList) => TemplateFnReturnType;
}

export function storiesOfDefinitionList<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    definitionListTemplate
  }: DefinitionListParameters<TemplateFnReturnType>
) {
  const stories = createStories('Definition List', parameters, definitionListArgTypes)
    .addParameters({
      args: {
        definitions
      }
    });

  const template = bindTemplate(definitionListArgsMapper, definitionListTemplate);

  stories.add(
    'default',
    template
  );

  stories.add(
    'vertical',
    template,
    {
      args: {
        modifier: 'dso-vertical'
      }
    }
  );

  stories.add(
    'emphasize description',
    template,
    {
      args: {
        modifier: 'dso-emphasize-description'
      }
    }
  );

  stories.add(
    'vertical with emphasized description',
    template,
    {
      args: {
        modifier: 'dso-vertical dso-emphasize-description'
      }
    }
  );

  stories.add(
    'columns 1-3',
    template,
    {
      args: {
        modifier: 'dso-columns-1-3 dso-with-header',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'columns 2-2',
    template,
    {
      args: {
        modifier: 'dso-columns-2-2 dso-with-header',
        definitions: columnDefinitions
      }
    }
  );

  stories.add(
    'columns 3-1',
    template,
    {
      args: {
        modifier: 'dso-columns-3-1',
        definitions: columnDefinitions.slice(1)
      }
    }
  );

  stories.add(
    'two columns small-content',
    template,
    {
      args: {
        modifier: 'dso-columns dso-2-columns',
        definitions: smallContentDefinitions
      }
    }
  );

  stories.add(
    'two columns',
    template,
    {
      args: {
        modifier: 'dso-columns dso-2-columns'
      }
    }
  );

  stories.add(
    'three columns small-content',
    template,
    {
      args: {
        modifier: 'dso-columns dso-3-columns',
        definitions: smallContentDefinitions
      }
    }
  );

  stories.add(
    'three columns',
    template,
    {
      args: {
        modifier: 'dso-columns dso-3-columns'
      }
    }
  );

  stories.add(
    'bordered',
    template,
    {
      args: {
        modifier: 'dso-bordered',
        useSrOnlyColon: true
      }
    }
  );

  stories.add(
    'columns list',
    template,
    {
      args: {
        modifier: 'dso-columns-list',
        definitions: listDefinitions
      }
    }
  );
}