import readme from "@dso-toolkit/core/src/components/progress-bar/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { ProgressBarArgs, progressBarMeta, progressBarStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<ProgressBarArgs> = {
  ...progressBarMeta({ readme }),
  title: "Core/Progress Bar",
};

export default meta;

const { Default, ArbitraryValues } = progressBarStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { progressBarTemplate } = templates;

    return {
      progressBarTemplate,
    };
  },
});

export { ArbitraryValues, Default };
