import readme from "@dso-toolkit/core/src/components/card/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import {
  CardArgs,
  cardArgTypes,
  cardArgsMapper,
  cardContent,
  cardContentButton,
  cardContentLabel,
  cardContentSlideToggle,
} from "./card.args.js";
import { content, infoButton } from "./card.content.js";
import { cardTemplate } from "./card.template.js";

type CardStory = StoryObj<CardArgs>;

const meta: Meta<CardArgs> = {
  title: "Core/Card",
  argTypes: cardArgTypes,
  args: {
    href: "#",
    dsoCardClick: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: CardStory = {
  args: cardContent,
  render: (args) => cardTemplate(cardArgsMapper(args, content)),
};

export const WithSelectableAndButton: CardStory = {
  args: {
    ...cardContentButton,
    selectable: true,
  },
  render: (args) => cardTemplate(cardArgsMapper(args, content)),
};

export const WithButton: CardStory = {
  args: cardContentButton,
  render: (args) => cardTemplate(cardArgsMapper(args, content)),
};

export const WithLabel: CardStory = {
  args: {
    ...cardContentLabel,
  },
  render: (args) => cardTemplate(cardArgsMapper(args, content)),
};

export const WithSlideToggle: CardStory = {
  args: cardContentSlideToggle,
  render: (args) => cardTemplate(cardArgsMapper(args, content)),
};

export const WithInfoButtonWithToggletip: CardStory = {
  args: cardContent,
  render: (args) => cardTemplate(cardArgsMapper(args, content, infoButton())),
};
