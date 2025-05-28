import type { Meta } from "@storybook/web-components";
import { ProgressIndicatorArgs, progressIndicatorMeta, progressIndicatorStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/progress-indicator/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ProgressIndicatorArgs> = {
  ...progressIndicatorMeta({ readme }),
  title: "HTML|CSS/Progress Indicator",
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
