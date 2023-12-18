import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/mark-bar/readme.md?raw";
import { MarkBarArgs, markBarMeta, markBarStories } from "dso-toolkit";

const meta: Meta<MarkBarArgs> = {
  ...markBarMeta({ readme }),
  title: "Core/Mark Bar",
};

export default meta;

const { Default } = markBarStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { markBarTemplate } = templates;

    return {
      markBarTemplate,
    };
  },
});

export { Default };
