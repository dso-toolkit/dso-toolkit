import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { CardListArgs, cardListArgTypes, cardListArgs, cardListArgsMapper } from "./card-list.args.js";
import { CardList } from "./card-list.models.js";

interface CardListStories {
  CardList: StoryObj<CardListArgs, Renderer>;
}

export interface CardListTemplates<TemplateFnReturnType> {
  cardListTemplate: (cardListProperties: CardList<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType[];
}

interface CardListStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  CardListTemplates<TemplateFnReturnType>
> {}

export function cardListMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  CardListArgs
> {
  return {
    argTypes: cardListArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function cardListStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: CardListStoriesParameters<Implementation, Templates, TemplateFnReturnType>): CardListStories {
  return {
    CardList: {
      args: cardListArgs,
      render: templateContainer.render(storyTemplates, (args, { cardListTemplate, content }) =>
        cardListTemplate(cardListArgsMapper(args, content)),
      ),
    },
  };
}
