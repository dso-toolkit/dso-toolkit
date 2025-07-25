import readme from "@dso-toolkit/core/src/components/card-container/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { CardContainerArgs, cardContainerMeta, cardContainerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { content } from "./card-container.content";

const meta: Meta<CardContainerArgs> = {
  ...cardContainerMeta({ readme }),
  title: "Core/Card Container",
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
