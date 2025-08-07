import type { Meta } from "@storybook/react-vite";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { decorator } from "./icon-overview.decorator";
import readme from "./readme.md?raw";

const icons: string[] = import.meta.env?.VITE_ICONS?.split(",") || [];

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
  icons,
});

export { Default, Overview };
