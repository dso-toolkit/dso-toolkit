import type { Meta } from "@storybook/web-components";
import { cardStories, CardArgs, cardMeta } from "dso-toolkit";

import readme from "dso-toolkit/src/components/card/readme.md?raw";
import { templateContainer } from "../../templates";
import { content } from "./card.content";

const meta: Meta<CardArgs> = {
  ...cardMeta({ readme }),
  title: "HTML|CSS/Card",
};

export default meta;

const {
  Static,
  Href,
  HrefWithButton,
  HrefWithImageAndButton,
  HrefWithWideImageAndButton,
  HrefWithSlidetoggle,
  HrefWithToggletip,
  HrefWithLabel,
  HrefAndSelectableWithButton,
} = cardStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { cardTemplate } = templates;

    return {
      cardTemplate,
      content,
    };
  },
});

export {
  Static,
  Href,
  HrefWithButton,
  HrefWithImageAndButton,
  HrefWithWideImageAndButton,
  HrefWithSlidetoggle,
  HrefWithToggletip,
  HrefWithLabel,
  HrefAndSelectableWithButton,
};
