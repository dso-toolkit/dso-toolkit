import { Meta } from "@storybook/angular";

import { ToggletipArgs, toggletipMeta, toggletipStories } from "dso-toolkit";
import { templateContainer } from "../../templates";
import { children } from "./toggletip.content";

import readme from "./readme.md?raw";
import { DsoToggletip } from "../../projects/component-library/src/public-api";

const meta: Meta<ToggletipArgs> = {
  ...toggletipMeta({ readme }),
  component: DsoToggletip,
  title: "Toggletip",
};

export default meta;

const { Toggletip } = toggletipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { toggletipTemplate } = templates;

    return {
      toggletipTemplate,
      children,
    };
  },
});

export { Toggletip };
