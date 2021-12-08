import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { CardArgs, cardArgsMapper, cardArgTypes } from './card.args';
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
      argTypes: cardArgTypes,
      args: componentArgs<CardArgs>({
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
}
