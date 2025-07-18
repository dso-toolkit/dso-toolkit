import componentsReadme from "@dso-toolkit/core/src/components/action-list/components/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/action-list/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { ActionListArgs, actionListMeta, actionListStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { actionListItems, actionListWithWarningItems } from "./action-list.content";

const meta: Meta<ActionListArgs> = {
  ...actionListMeta({ readme: `${readme}\n${componentsReadme}` }),
  title: "Core/Action List",
};

export default meta;

const { Default, WithWarning } = actionListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { actionListTemplate } = templates;

    return {
      actionListTemplate,
      actionListItems: actionListItems(templates),
      actionListWithWarningItems: actionListWithWarningItems(templates),
    };
  },
});

export { Default, WithWarning };
