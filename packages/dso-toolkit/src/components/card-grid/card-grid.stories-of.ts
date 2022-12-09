import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { Card } from "../card/card.models.js";
import { cardGridArgsMapper } from "./card-grid.args.js";
import { CardGrid } from "./card-grid.models.js";

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
