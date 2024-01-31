import type { Meta } from "@storybook/web-components";
import { SlideToggleArgs, slideToggleMeta, slideToggleStories } from "dso-toolkit";

import { DsoSlideToggle } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<SlideToggleArgs> = {
  ...slideToggleMeta({ readme }),
  title: "Slide Toggle",
  parameters: [{ component: DsoSlideToggle }],
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
