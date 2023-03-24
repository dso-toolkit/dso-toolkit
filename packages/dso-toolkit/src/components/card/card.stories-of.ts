import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { CardArgs, cardArgsMapper, cardArgTypes } from "./card.args.js";
import { cardContentButton, cardContentLabel, cardContentToggletip } from "./card.content.js";
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
      args: cardContentButton,
    });

    stories.add("selectable", template, {
      args: {
        ...cardContentButton,
        selectable: true,
      },
    });

    stories.add("with image", template, {
      args: {
        ...cardContentButton,
        image: "images/rectangle1.png",
        wideImage: false,
      },
    });

    stories.add("with wide image", template, {
      args: {
        ...cardContentButton,
        image: "images/rectangle1.png",
        wideImage: true,
      },
    });

    stories.add("with toggletip", template, {
      args: cardContentToggletip,
    });

    stories.add("with label", template, {
      args: {
        ...cardContentLabel,
      },
    });

    stories.add("not clickable", template, {
      args: {
        ...cardContentButton,
        clickable: false,
      },
    });

    return stories;
  });
}
