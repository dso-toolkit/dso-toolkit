import readme from "@dso-toolkit/core/src/components/icon/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";
import icons from "dso-toolkit/storybook-assets/icons.json";

import { decorator } from "./icon-overview.decorator";
import { iconTemplate } from "./icon.core-template";

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  title: "Core/Icon",
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
