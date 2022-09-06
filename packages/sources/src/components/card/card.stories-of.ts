import { bindTemplate, componentArgs, createStories, StorybookParameters } from '../../storybook';

import { CardArgs, cardArgsMapper, cardArgTypes } from './card.args';
import { Card } from './card.models';

export interface CardParameters<TemplateFnReturnType> {
  cardTemplate: (cardProperties: Card<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCard<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    cardTemplate
  }: CardParameters<TemplateFnReturnType>
) {
  const stories = createStories('Card', parameters, cardArgTypes)
    .addParameters({
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
        ],
        hasImage: false,
        imgSrc: ''
      })
    });

  const template = bindTemplate(cardArgsMapper, cardTemplate);

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
      args: componentArgs<Pick<CardArgs, 'hasImage' | 'imgSrc'>>({
        hasImage: true,
        imgSrc: '/images/rectangle1.png',
      })
    }
  );
}
