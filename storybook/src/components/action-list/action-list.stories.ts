import componentsReadme from "@dso-toolkit/core/src/components/action-list/components/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/action-list/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { ActionListArgs, actionListArgTypes, actionListArgs, actionListArgsMapper } from "./action-list.args.js";
import { actionListItems, actionListWithWarningItems } from "./action-list.content.js";
import { actionListTemplate } from "./action-list.template.js";

type ActionListStory = StoryObj<ActionListArgs>;

const meta: Meta<ActionListArgs> = {
  title: "Core/Action List",
  argTypes: actionListArgTypes,
  args: actionListArgs,
  parameters: {
    docs: {
      page: () => compiler(`${readme}\n${componentsReadme}`),
    },
  },
};

export default meta;

export const Default: ActionListStory = {
  render: (args) => actionListTemplate(actionListArgsMapper(args, actionListItems)),
};

export const WithWarning: ActionListStory = {
  render: (args) => actionListTemplate(actionListArgsMapper(args, actionListWithWarningItems)),
};
