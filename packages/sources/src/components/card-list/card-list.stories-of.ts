import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { cardListArgsMapper, cardListArgTypes } from './card-list.args';
import { CardList } from './card-list.models';

export interface CardListParameters<TemplateFnReturnType> {
  cardListTemplate: (cardListProperties: CardList<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCardList<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    cardListTemplate
  }: CardListParameters<TemplateFnReturnType>
) {
  const stories = createStories('Card List', parameters, cardListArgTypes)
    .addParameters({
      args: {
        cards: [
          {
            label: 'Omgevingsplan Nieuwegein',
            content: 'Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            label: 'Brouwersmolen',
            content: 'Brouwersmolen eget iaculis nisi quam in libero.',
            interactions: [
              {
                variant: 'tertiary',
                label: 'Toon informatie',
                icon: {
                  icon: 'info'
                }
              }
            ]
          }
        ]
      }
    });

  const template = bindTemplate(cardListArgsMapper, cardListTemplate);

  stories.add(
    'Card List',
    template
  );
}
