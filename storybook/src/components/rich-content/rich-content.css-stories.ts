import type { Meta } from "@storybook/web-components-vite";
import { RichContentArgs, richContentMeta, richContentStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/rich-content/readme.md?raw";

import { templateContainer } from "../../templates";

import { children } from "./rich-content.content";

const meta: Meta<RichContentArgs<unknown>> = {
  ...richContentMeta({ readme }),
  title: "HTML|CSS/Rich Content",
};

export default meta;

const { RichContent } = richContentStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { richContentTemplate } = templates;

    return {
      richContentTemplate,
      children: children(templates),
    };
  },
});

export { RichContent };
