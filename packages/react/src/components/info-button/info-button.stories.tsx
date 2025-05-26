import type { Meta } from "@storybook/react";
import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<InfoButtonArgs> = {
  ...infoButtonMeta({ readme }),
  title: "Info Button",
};

export default meta;

const { Active, Inactive, SecondaryActive, SecondaryInactive } = infoButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoButtonTemplate } = templates;

    return { infoButtonTemplate };
  },
});

export { Active, Inactive, SecondaryActive, SecondaryInactive };
