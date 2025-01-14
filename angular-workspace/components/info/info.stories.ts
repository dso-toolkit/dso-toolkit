import { InfoArgs, infoMeta, infoStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { richContent } from "./info.content";

import readme from "./readme.md?raw";
import type { Meta } from "@storybook/angular";
import { DsoInfo } from "../../projects/component-library/src/public-api";

const meta: Meta<InfoArgs> = {
  ...infoMeta({ readme }),
  component: DsoInfo,
  title: "Info",
};

export default meta;

const { Default, Fixed } = infoStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoTemplate } = templates;

    return {
      infoTemplate,
      richContent: richContent(),
    };
  },
});

export { Default, Fixed };
