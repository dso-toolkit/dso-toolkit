import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { CardListArgs, cardListArgsMapper, cardListArgTypes } from "./card-list.args";
import { CardList } from "./card-list.models";

export interface CardListTemplates<TemplateFnReturnType> {
  cardListTemplate: (cardListProperties: CardList<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfCardList<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    CardListTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Card List", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: cardListArgTypes,
      args: {
        cards: [
          {
            label: "Omgevingsplan Nieuwegein",
            content: "Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            label: "Brouwersmolen",
            content: "Brouwersmolen eget iaculis nisi quam in libero.",
            interactions: [
              {
                variant: "tertiary",
                label: "Toon informatie",
                icon: {
                  icon: "info",
                },
              },
            ],
          },
          {
            label: "Maximum bouwhoogte",
            content: "Maximum bouwhoogte: 13m",
            image: "images/rectangle1.png",
          },
        ],
      },
    });

    const template = templateMapper<CardListArgs<TemplateFnReturnType>>((args, { cardListTemplate }) =>
      cardListTemplate(cardListArgsMapper(args))
    );

    stories.add("Card List", template);
  });
}
