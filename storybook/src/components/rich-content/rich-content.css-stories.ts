import type { Meta } from "@storybook/web-components";
import { RichContentArgs, richContentMeta, richContentStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import readme from "@dso-toolkit/core/src/components/plekinfo-card/readme.md?raw";

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
