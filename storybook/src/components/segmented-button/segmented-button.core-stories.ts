import readme from "@dso-toolkit/core/src/components/segmented-button/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { SegmentedButtonArgs, segmentedButtonMeta, segmentedButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<SegmentedButtonArgs> = {
  ...segmentedButtonMeta({ readme }),
  title: "Core/Segmented-Button",
};

export default meta;

const { Default, WithDisabledButton } = segmentedButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { segmentedButtonTemplate } = templates;

    return {
      segmentedButtonTemplate,
    };
  },
});

export { Default, WithDisabledButton };
