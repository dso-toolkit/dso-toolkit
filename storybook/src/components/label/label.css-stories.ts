import type { Meta } from "@storybook/web-components";
import { labelStories, labelMeta, LabelArgs } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { decorator } from "./label.decorator";

import readme from "dso-toolkit/src/components/label/readme.md?raw";

const meta: Meta<LabelArgs> = {
  ...labelMeta({ readme }),
  component: "dso-label",
  title: "HTML|CSS/Label",
};

export default meta;

const { Plain, WithAction, Truncate, WithSymbolImage, WithSymbolColor } = labelStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { labelTemplate } = templates;

    return {
      labelTemplate,
    };
  },
  decorator,
});

export { Plain, WithAction, Truncate, WithSymbolImage, WithSymbolColor };
