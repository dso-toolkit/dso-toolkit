import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { CardContainerArgs, cardContainerArgsMapper, cardContainerArgTypes } from "./card-container.args.js";
import { cardContainerContent } from "./card-container.content.js";
import { CardContainer } from "./card-container.models.js";

export interface CardContainerTemplates<TemplateFnReturnType> {
  cardContainerTemplate: (cardContainerProperties: CardContainer<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType[];
}

export function storiesOfCardContainer<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    CardContainerTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Card Container", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: cardContainerArgTypes,
    });

    const template = templateMapper<CardContainerArgs>((args, { cardContainerTemplate, content }) =>
      cardContainerTemplate(cardContainerArgsMapper(args, content)),
    );

    stories.add("Card List", template, {
      args: { ...cardContainerContent, mode: "list" },
    });

    stories.add("Card Grid", template, {
      args: { ...cardContainerContent, mode: "grid" },
    });

    return stories;
  });
}
