import { storiesOf } from "@storybook/web-components";
import { storiesOfScrollable, StoryRoot } from "dso-toolkit";

import coreReadme from "@dso-toolkit/core/src/components/scrollable/readme.md";

import { templateContainer } from "../../templates";
import { decorator } from "./scrollable.decorator";
import { defaultContent, dynamicContent } from "./scrollable.content";

storiesOfScrollable(
  {
    parameters: {
      module,
      storiesOf,
      readme: coreReadme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ scrollableTemplate }, templates) => ({
      scrollableTemplate,
      defaultContent,
      dynamicContent: dynamicContent(templates),
    }),
  },
  {
    decorator,
  }
);
