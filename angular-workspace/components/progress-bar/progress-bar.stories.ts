import type { Meta } from "@storybook/angular";
import { ProgressBarArgs, progressBarMeta, progressBarStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { DsoProgressBar } from "../../projects/component-library/src/public-api";

const meta: Meta<ProgressBarArgs> = {
  ...progressBarMeta({ readme }),
  component: DsoProgressBar,
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
