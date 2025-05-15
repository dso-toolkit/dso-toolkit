import { type Meta, moduleMetadata } from "@storybook/angular";

import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import readme from "./readme.md?raw";
import { DsoInfoButton } from "../../projects/component-library/src/public-api";

const meta: Meta<InfoButtonArgs> = {
  ...infoButtonMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoInfoButton],
    }),
  ],
  title: "Info Button",
};

export default meta;

const { Active, Inactive, SecondaryActive, SecondaryInactive } = infoButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoButtonTemplate } = templates;

    return {
      infoButtonTemplate,
    };
  },
});

export { Active, Inactive, SecondaryActive, SecondaryInactive };
