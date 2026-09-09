import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/label-group/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { labelGroupArgsMapper } from "./label-group.args.js";
import { labelGroupTemplate } from "./label-group.template.js";

type LabelGroupStory = StoryObj<Record<string, never>, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "HTML|CSS/Label Group",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const LabelGroup: LabelGroupStory = {
  render: () => labelGroupTemplate(labelGroupArgsMapper()),
};
