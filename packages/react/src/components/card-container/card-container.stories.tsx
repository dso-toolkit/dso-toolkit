import type { Meta } from "@storybook/react-vite";
import { CardContainerArgs, cardContainerMeta, cardContainerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { content } from "./card-container.content";
import readme from "./readme.md?raw";

const meta: Meta<CardContainerArgs> = {
  ...cardContainerMeta({ readme }),
  title: "Card Container",
};

export default meta;

const { CardGrid, CardList } = cardContainerStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { cardContainerTemplate } = templates;

    return {
      cardContainerTemplate,
      content,
    };
  },
});

export { CardGrid, CardList };
