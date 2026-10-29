import { Meta, StoryObj } from "@storybook/web-components-vite";

import { labelGroupArgsMapper } from "./label-group.args.js";
import { labelGroupTemplate } from "./label-group.template.js";

const meta: Meta = {
  title: "HTML|CSS/Label Group",
  tags: ["!autodocs"],
};

export default meta;

export const LabelGroup: StoryObj = {
  render: () => labelGroupTemplate(labelGroupArgsMapper()),
};
