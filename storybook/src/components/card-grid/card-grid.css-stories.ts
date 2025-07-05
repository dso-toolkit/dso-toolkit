import type { Meta } from "@storybook/web-components-vite";
import { cardGridMeta, cardGridStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/card-grid/readme.md?raw";

import { templateContainer } from "../../templates";

import { cards } from "./card-grid.content";

const meta: Meta = {
  ...cardGridMeta({ readme }),
  title: "HTML|CSS/Card Grid",
};

export default meta;

const { CardGrid } = cardGridStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { cardGridTemplate } = templates;

    return {
      cardGridTemplate,
      cards,
    };
  },
});

export { CardGrid };
