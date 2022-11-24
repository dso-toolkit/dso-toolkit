import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { Card } from "../card/card.models";
import { cardGridArgsMapper } from "./card-grid.args";
import { CardGrid } from "./card-grid.models";

export interface CardGridTemplates<TemplateFnReturnType> {
  cardGridTemplate: (cardProperties: CardGrid<TemplateFnReturnType>) => TemplateFnReturnType;
  cards: Card<TemplateFnReturnType>[];
}

export function storiesOfCardGrid<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    CardGridTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Card Grid", storiesOfArguments, (stories, templateMapper) => {
    const template = templateMapper((_args, { cardGridTemplate, cards }) =>
      cardGridTemplate(cardGridArgsMapper(cards))
    );

    stories.add("Card Grid", template);

    return stories;
  });
}
