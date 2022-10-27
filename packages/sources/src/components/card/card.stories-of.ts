import { componentArgs } from '../../storybook';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { CardArgs, cardArgsMapper, cardArgTypes } from './card.args';
import { Card } from './card.models';

export interface CardTemplates<TemplateFnReturnType> {
  cardTemplate: (cardProperties: Card<TemplateFnReturnType>) => TemplateFnReturnType;
}

export const storiesOfCard = storiesOfFactory<CardTemplates<any>, CardArgs>('Card', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: cardArgTypes,
      args: componentArgs<Omit<CardArgs, 'image'>>({
        label: 'Omgevingsplan Nieuwegein',
        selectable: false,
        content: 'Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        interactions: [
          {
            variant: 'tertiary',
            label: 'Toon informatie',
            icon: {
              icon: 'info'
            }
          }
        ]
      })
    });

  const template = templateMapper((args, { cardTemplate }) => cardTemplate(cardArgsMapper(args)));

  stories.add(
    'default',
    template
  );

  stories.add(
    'selectable',
    template,
    {
      args: componentArgs<Pick<CardArgs, 'selectable'>>({
        selectable: true
      })
    }
  );

  stories.add(
    'with image',
    template,
    {
      args: componentArgs<Pick<CardArgs, 'image'>>({
        image: 'images/rectangle1.png',
      })
    }
  );
});
