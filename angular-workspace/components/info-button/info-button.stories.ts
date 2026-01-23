import { type Meta, moduleMetadata } from "@storybook/angular";
import { InfoButtonArgs, infoButtonMeta, infoButtonStories } from "dso-toolkit";

import { DsoInfoButton } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { children } from "../toggletip/toggletip.content";

import readme from "./readme.md?raw";

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

const { Default, Information, SecondaryActive, SecondaryInactive } = infoButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { infoButtonTemplate } = templates;

    return {
      infoButtonTemplate,
      children,
    };
  },
});

export { Default, Information, SecondaryActive, SecondaryInactive };
