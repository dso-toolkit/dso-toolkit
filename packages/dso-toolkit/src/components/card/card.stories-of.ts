import { StoriesOfArguments, noControl, storiesOfFactory } from "../../storybook/index.js";
import { CardArgs, cardArgsMapper, cardArgTypes } from "./card.args.js";
import {
  cardContent,
  cardContentButton,
  cardContentLabel,
  cardContentSlideToggle,
  cardContentToggletip,
} from "./card.content.js";
import { Card } from "./card.models.js";

export interface CardTemplates<TemplateFnReturnType> {
  cardTemplate: (cardProperties: Card<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType;
}

interface StoriesOfCardOptions {
  showLegacy?: boolean;
}

export function storiesOfCard<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    CardTemplates<TemplateFnReturnType>
  >,
  { showLegacy }: StoriesOfCardOptions = {},
) {
  return storiesOfFactory("Card", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      args: {
        href: "#",
      },
      argTypes: cardArgTypes,
    });

    const template = templateMapper<CardArgs>((args, { cardTemplate, content }) =>
      cardTemplate(cardArgsMapper(args, content)),
    );

    stories.add("static", template, {
      argTypes: {
        clickable: {
          ...noControl,
        },
        href: {
          ...noControl,
        },
      },
      args: {
        ...cardContent,
        href: undefined,
      },
    });

    stories.add("href", template, {
      args: cardContent,
    });

    stories.add("href with button", template, {
      args: cardContentButton,
    });

    stories.add("href with image and button", template, {
      args: {
        ...cardContentButton,
        image: "images/rectangle1.png",
      },
    });

    stories.add("href with wide image and button", template, {
      args: {
        ...cardContentButton,
        image: "images/rectangle1.png",
        imageShape: "wide",
      },
    });

    stories.add("href with toggletip", template, {
      args: cardContentToggletip,
    });

    stories.add("href with label", template, {
      args: {
        ...cardContentLabel,
      },
    });

    stories.add("href and selectable with button", template, {
      args: {
        ...cardContentButton,
        selectable: true,
      },
    });

    stories.add("href with slidetoggle", template, {
      args: cardContentSlideToggle,
    });

    if (showLegacy) {
      stories.add("clickable (legacy)", template, {
        args: {
          ...cardContentButton,
          clickable: true,
        },
      });
    }

    return stories;
  });
}
