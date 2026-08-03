import readme from "@dso-toolkit/core/src/components/scrollable/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { ScrollableArgs, scrollableMeta, scrollableStories } from "dso-toolkit";

import { defaultContent, dynamicContent } from "./scrollable.content";
import { scrollableTemplate } from "./scrollable.core-template";
import { decorator } from "./scrollable.decorator";

const meta: Meta<ScrollableArgs> = {
  ...scrollableMeta({ readme }),
  title: "Core/Scrollable",
};

export default meta;

const { Default, DynamicContent } = scrollableStories({
  storyTemplates: () => {
    return {
      scrollableTemplate,
      defaultContent,
      dynamicContent,
    };
  },
  decorator,
});

export { Default, DynamicContent };
