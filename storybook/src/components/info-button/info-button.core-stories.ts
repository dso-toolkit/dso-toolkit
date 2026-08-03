import readme from "@dso-toolkit/core/src/components/info-button/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";

import { children } from "./info-button.content";
import { infoButtonTemplate } from "./info-button.core-template";

const meta: Meta<InfoButtonArgs> = {
  ...infoButtonMeta({ readme }),
  title: "Core/Info Button",
};

export default meta;

const { Default, Information } = infoButtonStories({
  storyTemplates: () => {
    return {
      infoButtonTemplate,
      children,
    };
  },
});

export { Default, Information };
