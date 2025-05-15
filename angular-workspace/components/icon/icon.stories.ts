import { type Meta, moduleMetadata } from "@storybook/angular";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/icon/readme.md?raw";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";
import { DsoIcon } from "../../projects/component-library/src/public-api";

const meta: Meta<IconArgs> = {
  ...iconMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoIcon],
    }),
  ],
  title: "Icon",
};

export default meta;

const { Default } = iconStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { iconTemplate } = templates;

    return {
      iconTemplate,
    };
  },
});

export { Default };
