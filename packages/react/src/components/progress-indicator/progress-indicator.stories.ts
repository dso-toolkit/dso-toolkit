import { ProgressIndicatorArgs, progressIndicatorMeta, progressIndicatorStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

import type { Meta } from "@storybook/react";

const meta: Meta<ProgressIndicatorArgs> = {
  ...progressIndicatorMeta({ readme }),
  title: "Progress Indicator",
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
