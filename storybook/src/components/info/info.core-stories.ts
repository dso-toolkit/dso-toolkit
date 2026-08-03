import readme from "@dso-toolkit/core/src/components/info/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { InfoArgs, infoMeta, infoStories } from "dso-toolkit";

import { richContent } from "./info.content";
import { infoTemplate } from "./info.core-template";

const meta: Meta<InfoArgs> = {
  ...infoMeta({ readme }),
  title: "Core/Info",
};

export default meta;

const { Default, Fixed } = infoStories({
  storyTemplates: () => {
    return {
      infoTemplate,
      richContent,
    };
  },
});

export { Default, Fixed };
