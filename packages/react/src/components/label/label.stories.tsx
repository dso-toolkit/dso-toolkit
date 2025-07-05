import readme from "@dso-toolkit/react/src/components/label/readme.md?raw";
import { type Meta } from "@storybook/react-vite";
import { LabelArgs, labelMeta, labelStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { decorator } from "./label.decorator";

const meta: Meta<LabelArgs> = {
  ...labelMeta({ readme }),
  title: "Label",
};

export default meta;

const { Default, WithAction, Truncate, WithSymbolImage, WithSymbolColor } = labelStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { labelTemplate } = templates;

    return {
      labelTemplate,
    };
  },
  decorator,
});

export { Default, Truncate, WithAction, WithSymbolColor, WithSymbolImage };
