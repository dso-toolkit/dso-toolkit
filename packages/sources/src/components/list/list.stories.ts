import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { listArgsMapper, listArgTypes } from './list.args';
import { List, Type } from './list.models';

export interface ListParameters<TemplateFnReturnType> {
  listTemplate: (listProperties: List) => TemplateFnReturnType;
}

export function storiesOfList<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    listTemplate
  }: ListParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(listArgsMapper, listTemplate);

  const stories = storiesOf('List', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: listArgTypes,
      args: {
        listItems: [
          'Cras justo odio',
          'Dapibus ac facilisis in',
          'Morbi leo risus',
          'Porta ac consectetur ac',
          'Vestibulum at eros'
        ]
      }
    });

  stories.add(
    'unordered',
    template,
    {
      args: {
        type: Type.Ul
      }
    }
  );

  stories.add(
    'ordered',
    template,
    {
      args: {
        type: Type.Ol
      }
    }
  );

  stories.add(
    'group',
    template,
    {
      args: {
        type: Type.Ul,
        modifier: 'group'
      }
    }
  );

  stories.add(
    'columns',
    template,
    {
      args: {
        type: Type.Ul,
        modifier: 'columns'
      }
    }
  );
}
