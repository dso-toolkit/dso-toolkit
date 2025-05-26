import type { Meta } from "@storybook/web-components";
import { InfoArgs, infoMeta, infoStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/info/readme.md?raw";

import { templateContainer } from "../../templates";

import { richContent } from "./info.content";

const meta: Meta<InfoArgs> = {
  ...infoMeta({ readme }),
  title: "HTML|CSS/Info",
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
