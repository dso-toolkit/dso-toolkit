import { storiesOf } from "@storybook/angular";

import { storiesOfScrollContainer } from "dso-toolkit";

import { DsoScrollContainer } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { decorator } from "./scroll-container.decorator";

import readme from "./readme.md";
import { defaultContent, dynamicContent } from "./scroll-container.content";

storiesOfScrollContainer(
  {
    parameters: {
      module,
      storiesOf,
      readme,
      storyApiOptions: {
        parameters: [
          {
            component: DsoScrollContainer,
          },
        ],
      },
    },
    templateContainer,
    storyTemplates: ({ scrollContainerTemplate }) => ({
      scrollContainerTemplate,
      defaultContent,
      dynamicContent,
    }),
  },
  {
    decorator,
  }
);
