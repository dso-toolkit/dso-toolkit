import { storiesOf } from "@storybook/web-components";
import { storiesOfExpandable, StoryRoot } from "dso-toolkit";

import coreReadme from "@dso-toolkit/core/src/components/expandable/readme.md?raw";

import { templateContainer } from "../../templates";
import { expandableContent } from "./expandable.content";
import { decorator } from "./expandable.decorator";

storiesOfExpandable(
  {
    parameters: {
      module,
      storiesOf,
      readme: coreReadme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ expandableTemplate }, templates) => ({
      expandableTemplate,
      expandableContent: expandableContent(templates),
    }),
  },
  {
    decorator,
  }
);
