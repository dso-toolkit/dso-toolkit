import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { listsArgsMapper, listsArgTypes } from './lists.args';
import { Lists, ListType } from './lists.models';

export interface ListsParameters<TemplateFnReturnType> {
  listsTemplate: (listsProperties: Lists) => TemplateFnReturnType;
}

export function storiesOfLists<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    listsTemplate
  }: ListsParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(listsArgsMapper, listsTemplate);

  const stories = storiesOf('Lists', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: listsArgTypes,
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
        type: ListType.Ul
      }
    }
  );

  stories.add(
    'ordered',
    template,
    {
      args: {
        type: ListType.Ol
      }
    }
  );

  stories.add(
    'group',
    template,
    {
      args: {
        type: ListType.Ul,
        modifier: 'group'
      }
    }
  );

  stories.add(
    'columns',
    template,
    {
      args: {
        type: ListType.Ul,
        modifier: 'columns'
      }
    }
  );
}
