import { storiesOf } from "@storybook/react";
import { storiesOfExpandableHeading } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { expandableHeading, expandableHeadingWithChildList } from "./expandable-heading.content";

import readme from "./readme.md";

storiesOfExpandableHeading({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ expandableHeadingTemplate }, templates) => ({
    expandableHeadingTemplate,
    expandableHeading: expandableHeading(templates),
    expandableHeadingWithChildList: expandableHeadingWithChildList(templates),
  }),
});
