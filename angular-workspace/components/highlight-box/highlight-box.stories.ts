// import { moduleMetadata, storiesOf } from "@storybook/angular";

// import { storiesOfHighlightBox } from "dso-toolkit";

// import { templateContainer } from "../../templates";

// import readme from "./readme.md?raw";

import type { Meta } from "@storybook/angular";
// eslint-disable-next-line no-duplicate-imports -- Todo: #2593
import { moduleMetadata } from "@storybook/angular";
import { HighlightBoxArgs, highlightBoxMeta, highlightBoxStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { DsoHighlightBox, DsoIcon } from "../../projects/component-library/src/public-api";
import { content } from "./highlight-box.content";

import readme from "./readme.md?raw";

const meta: Meta<HighlightBoxArgs> = {
  ...highlightBoxMeta({ readme }),
  title: "Highlight Box",
  decorators: [
    moduleMetadata({
      declarations: [DsoIcon],
    }),
  ],
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
