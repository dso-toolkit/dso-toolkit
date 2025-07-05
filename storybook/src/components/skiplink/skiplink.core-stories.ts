import readme from "@dso-toolkit/core/src/components/skiplink/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { SkiplinkArgs, skiplinkMeta, skiplinkStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<SkiplinkArgs> = {
  ...skiplinkMeta({ readme }),
  title: "Core/Skiplink",
};

export default meta;

const { Default } = skiplinkStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { skiplinkTemplate } = templates;

    return {
      skiplinkTemplate,
    };
  },
});

export { Default };
