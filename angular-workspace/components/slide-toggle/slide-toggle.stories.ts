import { type Meta, moduleMetadata } from "@storybook/angular";
import { SlideToggleArgs, slideToggleMeta, slideToggleStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { DsoSlideToggle } from "../../projects/component-library/src/public-api";

const meta: Meta<SlideToggleArgs> = {
  ...slideToggleMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoSlideToggle],
    }),
  ],
  title: "Slide Toggle",
};

export default meta;

const { Default, Disabled, ZichtbaarLabel, LabelledById } = slideToggleStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { slideToggleTemplate } = templates;

    return {
      slideToggleTemplate,
    };
  },
});

export { Default, Disabled, ZichtbaarLabel, LabelledById };
