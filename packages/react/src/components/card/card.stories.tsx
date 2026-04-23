import type { Meta } from "@storybook/react-vite";
import { CardArgs, cardMeta, cardStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { content, infoButton } from "./card.content";
import readme from "./readme.md?raw";

const meta: Meta<CardArgs> = {
  ...cardMeta({ readme }),
  title: "Card",
};

export default meta;

const { Default, WithButton, WithSlideToggle, WithInfoButtonWithToggletip, WithLabel, WithSelectableAndButton } =
  cardStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { cardTemplate } = templates;

      return {
        cardTemplate,
        content,
        infoButton,
      };
    },
  });

export { Default, WithButton, WithInfoButtonWithToggletip, WithLabel, WithSelectableAndButton, WithSlideToggle };
