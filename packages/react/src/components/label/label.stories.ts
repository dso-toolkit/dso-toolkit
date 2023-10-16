import { type Meta } from "@storybook/react";
import { labelStories, labelMeta, LabelArgs } from "dso-toolkit";

import { DsoLabel } from "../../components";
import { templateContainer } from "../../templates";

import { decorator } from "./label.decorator";

import readme from "@dso-toolkit/react/src/components/label/readme.md?raw";

const meta: Meta<LabelArgs> = {
  ...labelMeta({ readme }),
  component: DsoLabel,
  title: "Label",
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
