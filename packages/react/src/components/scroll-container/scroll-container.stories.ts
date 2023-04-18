import { storiesOfScrollContainer } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";
import { decorator } from "./scroll-container.decorator";
import { defaultContent, dynamicContent } from "./scroll-container.content";

storiesOfScrollContainer(
  {
    parameters: {
      module,
      storiesOf,
      readme,
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
