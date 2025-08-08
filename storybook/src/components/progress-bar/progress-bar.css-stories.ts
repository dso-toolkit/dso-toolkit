import type { Meta } from "@storybook/web-components";
import { ProgressBarArgs, progressBarMeta, progressBarStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/progress-bar/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ProgressBarArgs> = {
  ...progressBarMeta({ readme }),
  title: "HTML|CSS/Progress Bar (Deprecated)",
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
