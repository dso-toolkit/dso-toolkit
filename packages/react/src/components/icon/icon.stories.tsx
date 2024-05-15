import type { Meta } from "@storybook/react";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  title: "Icon",
};

export default meta;

const { Icon } = iconStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { iconTemplate } = templates;

    return {
      iconTemplate,
    };
  },
});

export { Icon };
