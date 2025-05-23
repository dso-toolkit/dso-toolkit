import { type Meta, moduleMetadata } from "@storybook/angular";
import { ProgressBarArgs, progressBarMeta, progressBarStories } from "dso-toolkit";

import { DsoProgressBar } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<ProgressBarArgs> = {
  ...progressBarMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoProgressBar],
    }),
  ],
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

export { ArbitraryValues, Default };
