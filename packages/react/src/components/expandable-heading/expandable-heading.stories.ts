import { storiesOf } from "@storybook/react";
import { storiesOfExpandableHeading } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { expandableHeading } from "./content/expandable-heading";
import { expandableHeadingWithChildList } from "./content/expandable-heading-with-children";

import readme from "./readme.md?raw";

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
    expandableHeadingRenvooi: expandableHeadingWithChildList(templates, true),
  }),
});
