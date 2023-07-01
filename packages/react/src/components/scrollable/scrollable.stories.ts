import { storiesOfScrollable } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { decorator } from "./scrollable.decorator";
import { defaultContent, dynamicContent } from "./scrollable.content";

storiesOfScrollable(
  {
    parameters: {
      module,
      storiesOf,
      readme,
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
