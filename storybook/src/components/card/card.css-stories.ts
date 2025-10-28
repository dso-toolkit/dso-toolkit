import type { Meta } from "@storybook/web-components-vite";
import { CardArgs, cardMeta, cardStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/card/readme.md?raw";

import { templateContainer } from "../../templates";

import { content } from "./card.content";

const meta: Meta<CardArgs> = {
  ...cardMeta({ readme }),
  title: "HTML|CSS/Card (Deprecated)",
};

export default meta;

const { Default, WithButton, WithSlideToggle, WithToggletip, WithLabel, WithSelectableAndButton } = cardStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { cardTemplate } = templates;

    return {
      cardTemplate,
      content,
    };
  },
});

export { Default, WithButton, WithLabel, WithSelectableAndButton, WithSlideToggle, WithToggletip };
