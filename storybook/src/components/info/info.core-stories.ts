import readme from "@dso-toolkit/core/src/components/info/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { InfoArgs, infoMeta, infoStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { richContent } from "./info.content";

const meta: Meta<InfoArgs> = {
  ...infoMeta({ readme }),
  title: "Core/Info",
};

export default meta;

const { Default, Fixed } = infoStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoTemplate } = templates;

    return {
      infoTemplate,
      richContent: richContent(templates),
    };
  },
});

export { Default, Fixed };
