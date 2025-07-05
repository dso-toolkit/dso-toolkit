import readme from "@dso-toolkit/core/src/components/scrollable/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { ScrollableArgs, scrollableMeta, scrollableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { defaultContent, dynamicContent } from "./scrollable.content";
import { decorator } from "./scrollable.decorator";

const meta: Meta<ScrollableArgs> = {
  ...scrollableMeta({ readme }),
  title: "Core/Scrollable",
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
