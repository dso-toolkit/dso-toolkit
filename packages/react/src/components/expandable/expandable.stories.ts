import { storiesOf } from "@storybook/react";
import { storiesOfExpandable } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { expandableContent } from "./expandable.content";
import { decorator } from "./expandable.decorator";

import readme from "./readme.md?raw";

storiesOfExpandable(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ expandableTemplate }) => ({
      expandableTemplate,
      expandableContent,
    }),
  },
  {
    decorator,
  },
);
