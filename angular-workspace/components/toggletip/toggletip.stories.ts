import { type Meta, moduleMetadata } from "@storybook/angular";
import { ToggletipArgs, toggletipMeta, toggletipStories } from "dso-toolkit";

import { DsoToggletip } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { children } from "./toggletip.content";

const meta: Meta<ToggletipArgs> = {
  ...toggletipMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoToggletip],
    }),
  ],
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
