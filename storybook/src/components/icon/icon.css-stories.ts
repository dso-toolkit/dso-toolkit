import type { Meta } from "@storybook/web-components-vite";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/icon/readme.md?raw";

import { templateContainer } from "../../templates";

import { decorator } from "./icon-overview.decorator";

const icons: string[] = import.meta.env?.VITE_ICONS?.split(",") || [];

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  title: "HTML|CSS/Icon",
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
