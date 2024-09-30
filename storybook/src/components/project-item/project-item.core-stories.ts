import type { Meta } from "@storybook/web-components";
import { ProjectItemArgs, projectItemMeta, projectItemStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/project-item/readme.md?raw";

const meta: Meta<ProjectItemArgs> = {
  ...projectItemMeta({ readme }),
  title: "Core/Project Item",
};

export default meta;

const { Default } = projectItemStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { projectItemTemplate } = templates;

    return {
      projectItemTemplate,
    };
  },
});

export { Default };
