import readme from "@dso-toolkit/core/src/components/toggletip/readme.md?raw";
import { type Meta } from "@storybook/web-components-vite";
import { ToggletipArgs, toggletipMeta, toggletipStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { children } from "./toggletip.content";
import { decorator } from "./toggletip.decorator";

const meta: Meta<ToggletipArgs> = {
  ...toggletipMeta({ readme }),
  title: "Core/Toggletip",
};

export default meta;

const { Toggletip } = toggletipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { toggletipTemplate } = templates;

    return {
      toggletipTemplate,
      children: children(templates),
    };
  },
  decorator,
});

export { Toggletip };
