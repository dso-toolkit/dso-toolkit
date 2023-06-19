import { storiesOf } from "@storybook/angular";

import { storiesOfScrollable } from "dso-toolkit";

import { DsoScrollable } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { decorator } from "./scrollable.decorator";

import readme from "./readme.md?raw";
import { defaultContent, dynamicContent } from "./scrollable.content";

storiesOfScrollable(
  {
    parameters: {
      module,
      storiesOf,
      readme,
      storyApiOptions: {
        parameters: [
          {
            component: DsoScrollable,
          },
        ],
      },
    },
    templateContainer,
    storyTemplates: ({ scrollableTemplate }) => ({
      scrollableTemplate,
      defaultContent,
      dynamicContent,
    }),
  },
  {
    decorator,
  }
);
