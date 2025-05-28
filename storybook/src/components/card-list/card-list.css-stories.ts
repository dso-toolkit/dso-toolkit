import type { Meta } from "@storybook/web-components";
import { CardListArgs, cardListMeta, cardListStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/card-list/readme.md?raw";

import { templateContainer } from "../../templates";

import { content } from "./card-list.content";

const meta: Meta<CardListArgs> = {
  ...cardListMeta({ readme }),
  title: "HTML|CSS/Card List",
};

export default meta;

const { CardList } = cardListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { cardListTemplate } = templates;

    return {
      cardListTemplate,
      content,
    };
  },
});

export { CardList };
