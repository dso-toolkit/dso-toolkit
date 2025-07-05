import readme from "@dso-toolkit/core/src/components/progress-indicator/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { ProgressIndicatorArgs, progressIndicatorMeta, progressIndicatorStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

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

export { Large, Medium, Small };
