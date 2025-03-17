import type { Meta } from "@storybook/react";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";
import { decorator } from "./icon-overview.decorator";

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  title: "Icon",
};

export default meta;

const { Default, Overview } = iconStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { iconTemplate } = templates;

    return {
      iconTemplate,
    };
  },
  decorator,
});

export { Default, Overview };
