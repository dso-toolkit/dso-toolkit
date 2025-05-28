import readme from "@dso-toolkit/react/src/components/card/readme.md?raw";
import type { Meta } from "@storybook/react";
import { CardArgs, cardMeta, cardStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { content } from "./card.content";

const meta: Meta<CardArgs> = {
  ...cardMeta({ readme }),
  title: "Card",
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
