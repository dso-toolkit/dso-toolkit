import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/justify-form-groups/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { content } from "./justify-form-groups.content.js";
import { justifyFormGroupsTemplate } from "./justify-form-groups.template.js";

const meta: Meta = {
  title: "HTML|CSS/Justify Form Groups",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const JustifyFormGroups: StoryObj = {
  render: () => justifyFormGroupsTemplate(content),
};
