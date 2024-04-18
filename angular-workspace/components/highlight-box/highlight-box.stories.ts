import type { Meta } from "@storybook/angular";

import { HighlightBoxArgs, highlightBoxMeta, highlightBoxStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { content } from "./highlight-box.content";

import readme from "./readme.md?raw";

const meta: Meta<HighlightBoxArgs> = {
  ...highlightBoxMeta({ readme }),
  title: "Highlight Box",
};

export default meta;

const { Default, Yellow, WhiteWithDropshadow, WithBorder, WithIcon, WithBannerImage } = highlightBoxStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { highlightBoxTemplate } = templates;

    return {
      highlightBoxTemplate,
      content: content(),
    };
  },
});

export { Default, Yellow, WhiteWithDropshadow, WithBorder, WithIcon, WithBannerImage };
