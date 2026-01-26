import type { Meta } from "@storybook/react-vite";
import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { children } from "./info-button.content";
import readme from "./readme.md?raw";

const meta: Meta<InfoButtonArgs> = {
  ...infoButtonMeta({ readme }),
  title: "Info Button",
};

export default meta;

const { Default, Information, SecondaryActive, SecondaryInactive } = infoButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoButtonTemplate } = templates;

    return {
      infoButtonTemplate,
      children,
    };
  },
});

export { Default, Information, SecondaryActive, SecondaryInactive };
