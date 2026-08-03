import type { Meta } from "@storybook/web-components-vite";
import { RichContentArgs, richContentMeta, richContentStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/rich-content/readme.md?raw";

import { children } from "./rich-content.content";
import { richContentTemplate } from "./rich-content.css-template";

const meta: Meta<RichContentArgs<unknown>> = {
  ...richContentMeta({ readme }),
  title: "HTML|CSS/Rich Content",
};

export default meta;

const { RichContent } = richContentStories({
  storyTemplates: () => {
    return {
      richContentTemplate,
      children,
    };
  },
});

export { RichContent };
