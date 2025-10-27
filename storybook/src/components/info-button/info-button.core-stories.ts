import readme from "@dso-toolkit/core/src/components/info-button/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { children } from "./info-button.content";

const meta: Meta<InfoButtonArgs> = {
  ...infoButtonMeta({ readme }),
  title: "Core/Info Button",
};

export default meta;

const { Active, Inactive, SecondaryActive, SecondaryInactive, WithToggletip } = infoButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoButtonTemplate } = templates;

    return {
      infoButtonTemplate,
      children: children(templates),
    };
  },
});

export { Active, Inactive, SecondaryActive, SecondaryInactive, WithToggletip };
