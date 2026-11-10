import { Meta, StoryObj } from "@storybook/web-components-vite";

import { content } from "./justify-form-groups.content.js";
import { justifyFormGroupsTemplate } from "./justify-form-groups.template.js";

const meta: Meta = {
  title: "HTML|CSS/Justify Form Groups",
};

export default meta;

export const JustifyFormGroups: StoryObj = {
  render: () => justifyFormGroupsTemplate(content()),
};
