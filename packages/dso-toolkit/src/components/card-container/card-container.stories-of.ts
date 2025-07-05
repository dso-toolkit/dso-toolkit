import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import {
  CardContainerArgs,
  cardContainerArgTypes,
  cardContainerArgs,
  cardContainerArgsMapper,
} from "./card-container.args.js";
import { CardContainer } from "./card-container.models.js";

type CardContainerStory = StoryObj<CardContainerArgs, Renderer>;

interface CardContainerStories {
  CardGrid: CardContainerStory;
  CardList: CardContainerStory;
}

export interface CardContainerTemplates<TemplateFnReturnType> {
  cardContainerTemplate: (cardContainerProperties: CardContainer<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType[];
}

interface CardContainerStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    CardContainerTemplates<TemplateFnReturnType>
  > {}

export function cardContainerMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  CardContainerArgs
> {
  return {
    argTypes: cardContainerArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function cardContainerStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: CardContainerStoriesParameters<Implementation, Templates, TemplateFnReturnType>): CardContainerStories {
  return {
    CardGrid: {
      args: { ...cardContainerArgs, mode: "grid" },
      render: templateContainer.render(storyTemplates, (args, { cardContainerTemplate, content }) =>
        cardContainerTemplate(cardContainerArgsMapper(args, content)),
      ),
    },
    CardList: {
      args: { ...cardContainerArgs, mode: "list" },
      render: templateContainer.render(storyTemplates, (args, { cardContainerTemplate, content }) =>
        cardContainerTemplate(cardContainerArgsMapper(args, content)),
      ),
    },
  };
}
