import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/info-button/readme.md?raw";
import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";

const meta: Meta<InfoButtonArgs> = {
  ...infoButtonMeta({ readme }),
  title: "HTML|CSS/Info Button",
};

export default meta;

const { Active, Inactive, SecondaryActive, SecondaryInactive } = infoButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoButtonTemplate } = templates;

    return {
      infoButtonTemplate,
    };
  },
});

export { Inactive, Active, SecondaryInactive, SecondaryActive };
