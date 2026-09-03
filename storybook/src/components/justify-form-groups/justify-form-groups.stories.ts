import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/justify-form-groups/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { content } from "./justify-form-groups.content.js";
import { justifyFormGroupsTemplate } from "./justify-form-groups.template.js";

type JustifyFormGroupsStory = StoryObj<Record<string, never>, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "HTML|CSS/Justify Form Groups",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const JustifyFormGroups: JustifyFormGroupsStory = {
  render: () => justifyFormGroupsTemplate(content),
};
