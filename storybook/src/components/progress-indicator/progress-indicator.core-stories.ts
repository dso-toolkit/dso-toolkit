import readme from "@dso-toolkit/core/src/components/progress-indicator/readme.md?raw";
import { ProgressIndicatorArgs, progressIndicatorMeta, progressIndicatorStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import type { Meta } from "@storybook/web-components";

const meta: Meta<ProgressIndicatorArgs> = {
  ...progressIndicatorMeta({ readme }),
  title: "Core/Progress Indicator",
};

export default meta;

const { Small, Medium, Large } = progressIndicatorStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { progressIndicatorTemplate } = templates;

    return {
      progressIndicatorTemplate,
    };
  },
});

export { Small, Medium, Large };
