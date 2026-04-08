import readme from "@dso-toolkit/core/src/components/card/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { CardArgs, cardMeta, cardStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { content, infoButton } from "./card.content";

const meta: Meta<CardArgs> = {
  ...cardMeta({ readme }),
  title: "Core/Card",
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
        infoButton: infoButton(templates),
      };
    },
  });

export { Default, WithButton, WithInfoButtonWithToggletip, WithLabel, WithSelectableAndButton, WithSlideToggle };
