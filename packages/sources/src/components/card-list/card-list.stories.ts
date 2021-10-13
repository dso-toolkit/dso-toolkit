import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { cardListArgsMapper, cardListArgTypes } from './card-list.args';
import { CardList } from './card-list.models';

export interface CardListParameters<TemplateFnReturnType> {
  cardListTemplate: (cardListProperties: CardList) => TemplateFnReturnType;
}

export function storiesOfCards<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    cardListTemplate
  }: CardListParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(cardListArgsMapper, cardListTemplate);

  const stories = storiesOf('Card List', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: cardListArgTypes,
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
                button: {
                  variant: 'tertiary',
                  label: 'Toon informatie',
                  icon: {
                    icon: 'info'
                  }
                }
              }
            ]
          }
        ]
      }
    });

  stories.add(
    'Card List',
    template
  );
}
