import type { Meta } from "@storybook/react";
import { ScrollableArgs, scrollableMeta, scrollableStories } from "dso-toolkit";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";
import { decorator } from "./scrollable.decorator";
import { defaultContent, dynamicContent } from "./scrollable.content";

const meta: Meta<ScrollableArgs> = {
  ...scrollableMeta({ readme }),
  title: "Scrollable",
};

export default meta;

const { Default, DynamicContent } = scrollableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { scrollableTemplate } = templates;

    return {
      scrollableTemplate,
      defaultContent,
      dynamicContent: dynamicContent(templates),
    };
  },
  decorator,
});

export { Default, DynamicContent };
