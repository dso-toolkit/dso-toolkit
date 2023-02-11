import { storiesOf } from "@storybook/web-components";
import { storiesOfExpandableHeading, StoryRoot } from "dso-toolkit";

import coreReadme from "@dso-toolkit/core/src/components/expandable-heading/readme.md";

import { templateContainer } from "../../templates";
import { expandableHeaderContent } from "./expandable-heading.content";

storiesOfExpandableHeading({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ expandableHeadingTemplate }, templates) => ({
    expandableHeadingTemplate,

    expandableHeaderContent: expandableHeaderContent(templates),
  }),
});
