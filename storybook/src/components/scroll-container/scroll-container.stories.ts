import { storiesOf } from "@storybook/web-components";
import { storiesOfScrollContainer, StoryRoot } from "dso-toolkit";

import coreReadme from "@dso-toolkit/core/src/components/scroll-container/readme.md";

import { templateContainer } from "../../templates";
import { decorator } from "./scroll-container.decorator";
import { defaultContent, dynamicContent } from "./scroll-container.content";

storiesOfScrollContainer(
  {
    parameters: {
      module,
      storiesOf,
      readme: coreReadme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ scrollContainerTemplate }, templates) => ({
      scrollContainerTemplate,
      defaultContent,
      dynamicContent: dynamicContent(templates),
    }),
  },
  {
    decorator,
  }
);
