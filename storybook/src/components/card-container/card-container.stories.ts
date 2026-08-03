import readme from "@dso-toolkit/core/src/components/card-container/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  CardContainerArgs,
  cardContainerArgTypes,
  cardContainerArgs,
  cardContainerArgsMapper,
} from "./card-container.args.js";
import { content } from "./card-container.content.js";
import { cardContainerTemplate } from "./card-container.template.js";

type CardContainerStory = StoryObj<CardContainerArgs, Renderer>;

const meta: Meta<CardContainerArgs> = {
  title: "Core/Card Container",
  argTypes: cardContainerArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const CardGrid: CardContainerStory = {
  args: { ...cardContainerArgs, mode: "grid" },
  render: (args: CardContainerArgs) => cardContainerTemplate(cardContainerArgsMapper(args, content)),
};

export const CardList: CardContainerStory = {
  args: { ...cardContainerArgs, mode: "list" },
  render: (args: CardContainerArgs) => cardContainerTemplate(cardContainerArgsMapper(args, content)),
};
