import { CardContainerArgs, cardContainerMeta, cardContainerStories } from "dso-toolkit";
 
import readme from "@dso-toolkit/react/src/components/card-container/readme.md?raw";

import { templateContainer } from "../../templates";

import { content } from "./card-container.content";

import type { Meta } from "@storybook/react";

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
