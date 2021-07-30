import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { cardsArgsMapper, cardsArgTypes } from './cards.args';
import { Cards } from './cards.models';

export interface CardsParameters<TemplateFnReturnType> {
  cardsTemplate: (cardsProperties: Cards) => TemplateFnReturnType;
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
          }
        ]
      }
    });

  stories.add(
    'Default',
    template
  );

  stories.add(
    'Interactions bottom',
    template,
    {
      args: {
        interactionsLocation: "bottom"
      }
    }
  );

  stories.add(
    'Flat',
    template,
    {
      args: {
        modifiers: "dso-flat"
      }
    }
  );
}
