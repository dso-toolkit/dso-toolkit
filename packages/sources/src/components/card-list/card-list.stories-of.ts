import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { CardListArgs, cardListArgsMapper, cardListArgTypes } from './card-list.args';
import { CardList } from './card-list.models';

export interface CardListTemplates<TemplateFnReturnType> {
  cardListTemplate: (cardListProperties: CardList<TemplateFnReturnType>) => TemplateFnReturnType;
}

export const storiesOfCardList = storiesOfFactory<CardListTemplates<any>, CardListArgs<never>>('Card List', (stories, templateMapper) => {
  stories
    .addParameters({
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
                variant: 'tertiary',
                label: 'Toon informatie',
                icon: {
                  icon: 'info'
                }
              }
            ]
          },
          {
            label: 'Maximum bouwhoogte',
            content: 'Maximum bouwhoogte: 13m',
            image: 'images/rectangle1.png'
          }
        ]
      }
    });

  const template = templateMapper((args, { cardListTemplate }) => cardListTemplate(cardListArgsMapper(args)));

  stories.add(
    'Card List',
    template
  );
})

// export function storiesOfCardList<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     cardListTemplate
//   }: CardListParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Card List', parameters, cardListArgTypes)
//     .addParameters({
//       args: {
//         cards: [
//           {
//             label: 'Omgevingsplan Nieuwegein',
//             content: 'Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//           },
//           {
//             label: 'Brouwersmolen',
//             content: 'Brouwersmolen eget iaculis nisi quam in libero.',
//             interactions: [
//               {
//                 variant: 'tertiary',
//                 label: 'Toon informatie',
//                 icon: {
//                   icon: 'info'
//                 }
//               }
//             ]
//           },
//           {
//             label: 'Maximum bouwhoogte',
//             content: 'Maximum bouwhoogte: 13m',
//             image: 'images/rectangle1.png'
//           }
//         ]
//       }
//     });

//   const template = bindTemplate(cardListArgsMapper, cardListTemplate);

//   stories.add(
//     'Card List',
//     template
//   );
// }
