import { type Meta, moduleMetadata } from "@storybook/angular";
import { InfoArgs, infoMeta, infoStories } from "dso-toolkit";

import { DsoInfo } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import { richContent } from "./info.content";
import readme from "./readme.md?raw";

const meta: Meta<InfoArgs> = {
  ...infoMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoInfo],
    }),
  ],
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
