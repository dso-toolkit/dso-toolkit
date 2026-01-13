import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import {
  CardArgs,
  cardArgTypes,
  cardArgsMapper,
  cardContent,
  cardContentButton,
  cardContentLabel,
  cardContentSlideToggle,
  cardContentToggletip,
} from "./card.args.js";
import { Card } from "./card.models.js";

type CardStory = StoryObj<CardArgs, Renderer>;

interface CardStories {
  Default: CardStory;
  WithButton: CardStory;
  WithToggletip: CardStory;
  WithLabel: CardStory;
  WithSelectableAndButton: CardStory;
  WithSlideToggle: CardStory;
}

export interface CardTemplates<TemplateFnReturnType> {
  cardTemplate: (cardProperties: Card<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType;
}

interface CardStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  CardTemplates<TemplateFnReturnType>
> {}

export function cardMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  CardArgs
> {
  return {
    argTypes: cardArgTypes,
    args: {
      href: "#",
      dsoCardClick: fn(),
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
    Default: {
      args: cardContent,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithSelectableAndButton: {
      args: {
        ...cardContentButton,
        selectable: true,
      },
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithButton: {
      args: cardContentButton,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithLabel: {
      args: {
        ...cardContentLabel,
      },
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithSlideToggle: {
      args: cardContentSlideToggle,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithToggletip: {
      args: cardContentToggletip,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
  };
}
