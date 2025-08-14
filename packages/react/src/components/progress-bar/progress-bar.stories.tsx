import type { Meta } from "@storybook/react-vite";
import { ProgressBarArgs, progressBarMeta, progressBarStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<ProgressBarArgs> = {
  ...progressBarMeta({ readme }),
  title: "Progress Bar (Deprecated)",
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
