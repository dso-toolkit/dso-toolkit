import { Meta, StoryObj } from "@storybook/web-components-vite";

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
  tags: ["!autodocs"],
  argTypes: cardContainerArgTypes,
  args: cardContainerArgs,
  render: (args) => cardContainerTemplate(cardContainerArgsMapper(args, content())),
};

export default meta;

export const CardGrid: CardContainerStory = {
  args: { mode: "grid" },
};

export const CardList: CardContainerStory = {
  args: { mode: "list" },
};
