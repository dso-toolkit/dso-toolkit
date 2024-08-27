import type { Meta } from "@storybook/web-components";
import { ParagraphArgs, paragraphMeta, paragraphStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/paragraph/readme.md?raw";

const meta: Meta<ParagraphArgs> = {
  ...paragraphMeta({ readme }),
  title: "HTML|CSS/Paragraph",
};

export default meta;

const { Default, Disclaimer } = paragraphStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { paragraphTemplate } = templates;

    return {
      paragraphTemplate,
    };
  },
});

export { Default, Disclaimer };
