import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";
import { Card } from "../card/card.models.js";

import { CardGrid } from "./card-grid.models.js";

interface CardGridStories {
  CardGrid: StoryObj<Record<string, never>, Renderer>;
}

export interface CardGridTemplates<TemplateFnReturnType> {
  cardGridTemplate: (cardProperties: CardGrid<TemplateFnReturnType>) => TemplateFnReturnType;
  cards: Card<TemplateFnReturnType>[];
}

interface CardGridStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, CardGridTemplates<TemplateFnReturnType>> {}

export function cardGridMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function cardGridStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: CardGridStoriesParameters<Implementation, Templates, TemplateFnReturnType>): CardGridStories {
  return {
    CardGrid: {
      render: templateContainer.render(storyTemplates, (_args, { cardGridTemplate, cards }) =>
        cardGridTemplate({ cards }),
      ),
    },
  };
}
