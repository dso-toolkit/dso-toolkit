import type { Meta } from "@storybook/web-components";
import { PanelArgs, panelMeta, panelStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/panel/readme.md?raw";

const meta: Meta<PanelArgs> = {
  ...panelMeta({ readme }),
  title: "Core/Panel",
};

export default meta;

const { Default } = panelStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { panelTemplate } = templates;

    return {
      panelTemplate,
    };
  },
});

export { Default };
