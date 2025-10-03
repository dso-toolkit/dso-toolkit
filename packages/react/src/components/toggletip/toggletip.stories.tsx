import { Meta } from "@storybook/react-vite";
import { ToggletipArgs, toggletipMeta, toggletipStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { children } from "./toggletip.content";

const meta: Meta<ToggletipArgs> = {
  ...toggletipMeta({ readme }),
  title: "Toggletip",
};

export default meta;

const { Default } = toggletipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { toggletipTemplate } = templates;

    return {
      toggletipTemplate,
      children,
    };
  },
});

export { Default };
