import readme from "@dso-toolkit/core/src/components/card-container/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import {
  CardContainerArgs,
  cardContainerArgTypes,
  cardContainerArgs,
  cardContainerArgsMapper,
} from "./card-container.args.js";
import { content } from "./card-container.content.js";
import { cardContainerTemplate } from "./card-container.template.js";

type CardContainerStory = StoryObj<CardContainerArgs>;

const meta: Meta<CardContainerArgs> = {
  title: "Core/Card Container",
  argTypes: cardContainerArgTypes,
  args: cardContainerArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => cardContainerTemplate(cardContainerArgsMapper(args, content())),
};

export default meta;

export const CardGrid: CardContainerStory = {
  args: { mode: "grid" },
};

export const CardList: CardContainerStory = {
  args: { mode: "list" },
};
