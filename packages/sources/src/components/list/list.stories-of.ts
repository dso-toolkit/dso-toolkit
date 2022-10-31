import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { ListArgs, listArgsMapper, listArgTypes } from './list.args';
import { List, Type } from './list.models';

export interface ListTemplates<TemplateFnReturnType> {
  listTemplate: (listProperties: List) => TemplateFnReturnType;
}

export function storiesOfList<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, ListTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('List', storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: listArgTypes,
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

    const template = templateMapper<ListArgs>((args, { listTemplate }) => listTemplate(listArgsMapper(args)));

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
              imgSrc: 'images/rectangle1.png'
            },
            {
              text: 'Dapibus ac facilisis in',
              imgSrc: 'images/rectangle2.png'
            },
            {
              text: 'Morbi leo risus',
              imgSrc: 'images/rectangle1.png'
            },
            {
              text: 'Porta ac consectetur ac',
              imgSrc: 'images/rectangle2.png'
            },
            {
              text: 'Vestibulum at eros',
              imgSrc: 'images/rectangle1.png'
            }
          ]
        }
      }
    );

    stories.add(
      'unstyled',
      template,
      {
        args: {
          type: Type.Ul,
          modifier: 'unstyled'
        }
      }
    );
  });
}