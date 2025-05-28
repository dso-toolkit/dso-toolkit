import readme from "@dso-toolkit/react/src/components/slide-toggle/readme.md?raw";
import type { Meta } from "@storybook/react";
import { SlideToggleArgs, slideToggleMeta, slideToggleStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<SlideToggleArgs> = {
  ...slideToggleMeta({ readme }),
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

export { Default, Disabled, LabelledById, ZichtbaarLabel };
