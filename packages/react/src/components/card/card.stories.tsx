import type { Meta } from "@storybook/react";
import { cardStories, CardArgs, cardMeta } from "dso-toolkit";

import readme from "@dso-toolkit/react/src/components/card/readme.md?raw";
import { templateContainer } from "../../templates";
import { content } from "./card.content";

const meta: Meta<CardArgs> = {
  ...cardMeta({ readme }),
  title: "Card",
};

export default meta;

const { Basic, WithButton, WithSlidetoggle, WithToggletip, WithLabel, WithSelectableAndButton } = cardStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { cardTemplate } = templates;

    return {
      cardTemplate,
      content,
    };
  },
});

export { Basic, WithButton, WithSlidetoggle, WithToggletip, WithLabel, WithSelectableAndButton };
