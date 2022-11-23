import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { CardListArgs, cardListArgsMapper, cardListArgTypes } from "./card-list.args";
import { cardListContent } from "./card-list.content";
import { CardList } from "./card-list.models";

export interface CardListTemplates<TemplateFnReturnType> {
  cardListTemplate: (cardListProperties: CardList<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType[];
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
    });

    const template = templateMapper<CardListArgs>((args, { cardListTemplate, content }) =>
      cardListTemplate(cardListArgsMapper(args, content))
    );

    stories.add("Card List", template, { args: cardListContent });
  });
}
