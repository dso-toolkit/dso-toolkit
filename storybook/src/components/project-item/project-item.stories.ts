import readme from "@dso-toolkit/core/src/components/project-item/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { ProjectItemArgs, projectItemArgTypes, projectItemArgs, projectItemArgsMapper } from "./project-item.args.js";
import { projectItemTemplate } from "./project-item.template.js";

type ProjectItemStory = StoryObj<ProjectItemArgs, Renderer>;

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
  render: (args: ProjectItemArgs) => projectItemTemplate(projectItemArgsMapper(args)),
};
