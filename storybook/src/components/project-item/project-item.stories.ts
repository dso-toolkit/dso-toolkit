import readme from "@dso-toolkit/core/src/components/project-item/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { ProjectItemArgs, projectItemArgTypes, projectItemArgs, projectItemArgsMapper } from "./project-item.args.js";
import { projectItemTemplate } from "./project-item.template.js";

type ProjectItemStory = StoryObj<ProjectItemArgs>;

const meta: Meta<ProjectItemArgs> = {
  title: "Core/Project Item",
  argTypes: projectItemArgTypes,
  args: projectItemArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: ProjectItemStory = {
  render: (args) => projectItemTemplate(projectItemArgsMapper(args)),
};
