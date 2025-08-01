import readme from "@dso-toolkit/core/src/components/icon/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { decorator } from "./icon-overview.decorator";

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  title: "Core/Icon",
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
