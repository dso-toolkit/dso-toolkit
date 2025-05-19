import { ProgressBarArgs, progressBarMeta, progressBarStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

import type { Meta } from "@storybook/react";

const meta: Meta<ProgressBarArgs> = {
  ...progressBarMeta({ readme }),
  title: "Progress Bar",
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

export { Default, ArbitraryValues };
