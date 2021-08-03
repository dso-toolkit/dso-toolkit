import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { cardArgsMapper, cardArgTypes } from './card.args';
import { Card } from './card.models';

export interface CardParameters<TemplateFnReturnType> {
  cardTemplate: (cardProperties: Card<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCard<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    cardTemplate
  }: CardParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(cardArgsMapper, cardTemplate);

  const stories = storiesOf('Card', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: cardArgTypes
    });

  stories.add(
    'Card',
    template,
    {
      args: {
        label: "Omgevingsplan Nieuwegein",
        content: "Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
    }
  );
}
