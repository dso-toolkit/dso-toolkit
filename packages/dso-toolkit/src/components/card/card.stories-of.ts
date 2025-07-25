import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import {
  CardArgs,
  cardArgTypes,
  cardArgs,
  cardArgsMapper,
  cardWithButtonArgs,
  cardWithLabelArgs,
  cardWithSlideToggleArgs,
  cardWithToggletipArgs,
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

interface CardStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, CardTemplates<TemplateFnReturnType>> {}

export function cardMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  CardArgs
> {
  return {
    argTypes: cardArgTypes,
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
      args: cardArgs,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithSelectableAndButton: {
      args: {
        ...cardWithButtonArgs,
        selectable: true,
      },
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithButton: {
      args: cardWithButtonArgs,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithLabel: {
      args: cardWithLabelArgs,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithSlideToggle: {
      args: cardWithSlideToggleArgs,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
    WithToggletip: {
      args: cardWithToggletipArgs,
      render: templateContainer.render(storyTemplates, (args, { cardTemplate, content }) =>
        cardTemplate(cardArgsMapper(args, content)),
      ),
    },
  };
}
