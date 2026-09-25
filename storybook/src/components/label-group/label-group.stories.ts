import { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/label-group/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { labelGroupArgsMapper } from "./label-group.args.js";
import { labelGroupTemplate } from "./label-group.template.js";

const meta: Meta = {
  title: "HTML|CSS/Label Group",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const LabelGroup: StoryObj = {
  render: () => labelGroupTemplate(labelGroupArgsMapper()),
};
