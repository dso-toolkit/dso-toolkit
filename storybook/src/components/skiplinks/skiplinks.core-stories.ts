import type { Meta } from "@storybook/web-components";
import { SkiplinksArgs, skiplinksMeta, skiplinksStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/skiplinks/readme.md?raw";

const meta: Meta<SkiplinksArgs> = {
  ...skiplinksMeta({ readme }),
  title: "Core/Skiplinks",
};

export default meta;

const { Default } = skiplinksStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { skiplinksTemplate } = templates;

    return {
      skiplinksTemplate,
    };
  },
});

export { Default };
