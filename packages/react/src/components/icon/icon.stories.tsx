import type { Meta } from "@storybook/react-vite";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";
import icons from "dso-toolkit/storybook-assets/icons.json";

import { decorator } from "./icon-overview.decorator";
import { iconTemplate } from "./icon.react-template";
import readme from "./readme.md?raw";

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  title: "Icon",
};

export default meta;

const { Default, Overview } = iconStories({
  storyTemplates: () => {
    return {
      iconTemplate,
    };
  },
  decorator,
  icons,
});

export { Default, Overview };
