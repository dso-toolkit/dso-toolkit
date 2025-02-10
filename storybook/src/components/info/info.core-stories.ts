import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/info/readme.md?raw";
import { InfoArgs, infoMeta, infoStories } from "dso-toolkit";
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
