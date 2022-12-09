import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { CardArgs, cardArgsMapper, cardArgTypes } from "./card.args.js";
import { cardContent } from "./card.content.js";
import { Card } from "./card.models.js";

export interface CardTemplates<TemplateFnReturnType> {
  cardTemplate: (cardProperties: Card<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType;
}

export function storiesOfCard<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    CardTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Card", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: cardArgTypes,
    });

    const template = templateMapper<CardArgs>((args, { cardTemplate, content }) =>
      cardTemplate(cardArgsMapper(args, content))
    );

    stories.add("default", template, {
      args: cardContent,
    });

    stories.add("selectable", template, {
      args: {
        ...cardContent,
        selectable: true,
      },
    });

    stories.add("with image", template, {
      args: {
        ...cardContent,
        image: "images/rectangle1.png",
      },
    });

    return stories;
  });
}
