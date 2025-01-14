import type { Meta } from "@storybook/angular";

import { HelpcenterPanelArgs, helpcenterPanelMeta, helpcenterPanelStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { DsoHelpcenterPanel } from "../../projects/component-library/src/public-api";

const meta: Meta<HelpcenterPanelArgs> = {
  ...helpcenterPanelMeta({ readme }),
  component: DsoHelpcenterPanel,
  title: "Helpcenter Panel",
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
