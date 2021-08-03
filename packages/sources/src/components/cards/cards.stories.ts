import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { cardsArgsMapper, cardsArgTypes } from './cards.args';
import { Cards } from './cards.models';

export interface CardsParameters<TemplateFnReturnType> {
  cardsTemplate: (cardsProperties: Cards<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCards<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    cardsTemplate
  }: CardsParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(cardsArgsMapper, cardsTemplate);

  const stories = storiesOf('Cards', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: cardsArgTypes,
      args: {
        cards: [
          {
            label: "Omgevingsplan Nieuwegein",
            content: "Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            label: "Brouwersmolen",
            content: "Brouwersmolen eget iaculis nisi quam in libero.",
            interactions: [
              {
                button: {
                  variant: "tertiary",
                  label: "Button",
                  icon: {
                    icon: "info"
                  }
                }
              }
            ]
          }
        ]
      }
    });

  stories.add(
    'Cards',
    template
  );
}
