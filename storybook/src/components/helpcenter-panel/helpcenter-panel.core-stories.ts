import type { Meta } from "@storybook/web-components";
import { HelpcenterPanelArgs, helpcenterPanelMeta, helpcenterPanelStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/helpcenter-panel/readme.md?raw";

const meta: Meta<HelpcenterPanelArgs> = {
  ...helpcenterPanelMeta({ readme }),
  title: "HTML|CSS/Helpcenter Panel",
};

export default meta;

const { HelpcenterPanel } = helpcenterPanelStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { helpcenterPanelTemplate } = templates;

    return {
      helpcenterPanelTemplate,
    };
  },
});

export { HelpcenterPanel };
