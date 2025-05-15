import { type Meta, moduleMetadata } from "@storybook/angular";
import { ProgressIndicatorArgs, progressIndicatorMeta, progressIndicatorStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { DsoProgressIndicator } from "../../projects/component-library/src/public-api";

const meta: Meta<ProgressIndicatorArgs> = {
  ...progressIndicatorMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoProgressIndicator],
    }),
  ],
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

export { Small, Medium, Large };
