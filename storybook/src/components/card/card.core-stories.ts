import type { Meta } from "@storybook/web-components";
import { cardStories, CardArgs, cardMeta } from "dso-toolkit";

import readme from "@dso-toolkit/core/src/components/card/readme.md?raw";
import { templateContainer } from "../../templates";
import { content } from "./card.content";

const meta: Meta<CardArgs> = {
  ...cardMeta({ readme }),
  title: "Core/Card",
};

export default meta;

const { Href, HrefWithButton, HrefWithSlidetoggle, HrefWithToggletip, HrefWithLabel, HrefAndSelectableWithButton } =
  cardStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { cardTemplate } = templates;

      return {
        cardTemplate,
        content,
      };
    },
  });

export { Href, HrefWithButton, HrefWithSlidetoggle, HrefWithToggletip, HrefWithLabel, HrefAndSelectableWithButton };
