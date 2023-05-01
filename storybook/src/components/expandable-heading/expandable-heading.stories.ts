import { storiesOf } from "@storybook/web-components";
import { storiesOfExpandableHeading, StoryRoot } from "dso-toolkit";

import coreReadme from "@dso-toolkit/core/src/components/expandable-heading/readme.md";

import { templateContainer } from "../../templates";
import { expandableHeading } from "./content/expandable-heading";
import { expandableHeadingWithChildList } from "./content/expandable-heading-with-children";

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
    expandableHeading: expandableHeading(templates),
    expandableHeadingWithChildList: expandableHeadingWithChildList(templates),
    expandableHeadingRenvooi: expandableHeadingWithChildList(templates, true),
  }),
});
