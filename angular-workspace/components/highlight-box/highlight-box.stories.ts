import { type Meta, moduleMetadata } from "@storybook/angular";
import { HighlightBoxArgs, highlightBoxMeta, highlightBoxStories } from "dso-toolkit";

import { DsoHighlightBox } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import { content } from "./highlight-box.content";
import readme from "./readme.md?raw";

const meta: Meta<HighlightBoxArgs> = {
  ...highlightBoxMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoHighlightBox],
    }),
  ],
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

export { Default, WhiteWithDropshadow, WithBannerImage, WithBorder, WithIcon, Yellow };
