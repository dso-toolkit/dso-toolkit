import type { Meta } from "@storybook/web-components-vite";
import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/info-button/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<InfoButtonArgs> = {
  ...infoButtonMeta({ readme }),
  title: "HTML|CSS/Info Button",
};

export default meta;

const { Default, SecondaryActive, SecondaryInactive } = infoButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoButtonTemplate } = templates;

    return {
      infoButtonTemplate,
    };
  },
});

export { Default, SecondaryActive, SecondaryInactive };
