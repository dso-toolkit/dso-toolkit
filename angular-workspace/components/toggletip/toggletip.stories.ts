import { Meta } from "@storybook/angular";

import { ToggletipArgs, toggletipMeta, toggletipStories } from "dso-toolkit";
import { templateContainer } from "../../templates";
import { children } from "./toggletip.content";

import readme from "./readme.md?raw";

const meta: Meta<ToggletipArgs> = {
  ...toggletipMeta({ readme }),
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
