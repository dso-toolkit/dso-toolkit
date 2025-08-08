import readme from "@dso-toolkit/core/src/components/icon/readme.md?raw";
import { type Meta, moduleMetadata } from "@storybook/angular";
import { IconArgs, iconMeta, iconStories } from "dso-toolkit";

import { DsoIcon } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

const icons: string[] = process?.env["ICONS"]?.split(",") || [];

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
  icons,
});

export { Default };
