import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { listArgsMapper, listArgTypes } from './list.args';
import { List, Type } from './list.models';

export interface ListParameters<TemplateFnReturnType> {
  listTemplate: (listProperties: List) => TemplateFnReturnType;
}

export function storiesOfList<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    listTemplate
  }: ListParameters<TemplateFnReturnType>
) {
  const stories = createStories('List', parameters, listArgTypes)
    .addParameters({
      args: {
        items: [
          { text: 'Cras justo odio' },
          { text: 'Dapibus ac facilisis in' },
          { text: 'Morbi leo risus' },
          { text: 'Porta ac consectetur ac' },
          { text: 'Vestibulum at eros' }
        ]
      }
    });

  const template = bindTemplate(listArgsMapper, listTemplate);

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

  stories.add(
    'image list',
    template,
    {
      args: {
        type: Type.Ul,
        modifier: 'img-list',
        items: [
          {
            text: 'Cras justo odio',
            imgSrc: '/images/rectangle1.png'
          },
          {
            text: 'Dapibus ac facilisis in',
            imgSrc: '/images/rectangle2.png'
          },
          {
            text: 'Morbi leo risus',
            imgSrc: '/images/rectangle1.png'
          },
          {
            text: 'Porta ac consectetur ac',
            imgSrc: '/images/rectangle2.png'
          },
          {
            text: 'Vestibulum at eros',
            imgSrc: '/images/rectangle1.png'
          }
        ]
      }
    }
  );
}
