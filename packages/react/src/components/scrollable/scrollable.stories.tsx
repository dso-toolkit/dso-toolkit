import type { Meta } from "@storybook/react-vite";
import { ScrollableArgs, scrollableMeta, scrollableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { defaultContent, dynamicContent } from "./scrollable.content";
import { decorator } from "./scrollable.decorator";

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
