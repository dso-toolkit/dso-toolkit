import { ComponentAnnotations, Renderer } from "@storybook/types";

import {
  CardArgs,
  cardArgsMapper,
  cardArgTypes,
  cardContent,
  cardContentButton,
  cardContentLabel,
  cardContentSlideToggle,
  cardContentToggletip,
} from "./card.args.js";
import { Card } from "./card.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type CardStory = StoryObj<CardArgs, Renderer>;

interface CardStories {
  Href: CardStory;
  HrefWithButton: CardStory;
  HrefWithToggletip: CardStory;
  HrefWithLabel: CardStory;
  HrefAndSelectableWithButton: CardStory;
  HrefWithSlidetoggle: CardStory;
}

export interface CardTemplates<TemplateFnReturnType> {
  cardTemplate: (cardProperties: Card<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType;
}

interface CardStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, CardTemplates<TemplateFnReturnType>> {}

export function cardMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  CardArgs
> {
  return {
    argTypes: cardArgTypes,
    args: {
      href: "#",
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function cardStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: CardStoriesParameters<Implementation, Templates, TemplateFnReturnType>): CardStories {
  return {
    Href: {
      args: cardContent,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    HrefAndSelectableWithButton: {
      args: {
        ...cardContentButton,
        selectable: true,
      },
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    HrefWithButton: {
      args: cardContentButton,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    HrefWithLabel: {
      args: {
        ...cardContentLabel,
      },
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    HrefWithSlidetoggle: {
      args: cardContentSlideToggle,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    HrefWithToggletip: {
      args: cardContentToggletip,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
  };
}
