import type { Meta } from "@storybook/web-components";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/icon/readme.md?raw";

import { templateContainer } from "../../templates";

import { decorator } from "./icon-overview.decorator";

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
});

export { Default, Overview };
