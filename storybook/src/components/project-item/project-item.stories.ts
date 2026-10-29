import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ProjectItemArgs, projectItemArgTypes, projectItemArgs, projectItemArgsMapper } from "./project-item.args.js";
import { projectItemTemplate } from "./project-item.template.js";

type ProjectItemStory = StoryObj<ProjectItemArgs>;

const meta: Meta<ProjectItemArgs> = {
  title: "Core/Project Item",
  tags: ["!autodocs"],
  argTypes: projectItemArgTypes,
  args: projectItemArgs,
};

export default meta;

export const Default: ProjectItemStory = {
  render: (args) => projectItemTemplate(projectItemArgsMapper(args)),
};
