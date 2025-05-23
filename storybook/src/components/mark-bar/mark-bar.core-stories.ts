import readme from "@dso-toolkit/core/src/components/mark-bar/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { MarkBarArgs, markBarMeta, markBarStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

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
