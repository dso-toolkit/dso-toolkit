import { storiesOf } from "@storybook/angular";
import { storiesOfExpandableHeading } from "dso-toolkit";

import { DsoExpandable } from "../../projects/component-library/src/lib/stencil-generated/components";
import { templateContainer } from "../../templates";
import { expandableHeading, expandableHeadingWithChildList } from "./expandable-heading.content";

import readme from "./readme.md";

storiesOfExpandableHeading({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoExpandable,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ expandableHeadingTemplate }, templates) => ({
    expandableHeadingTemplate,
    expandableHeading: expandableHeading(templates),
    expandableHeadingWithChildList: expandableHeadingWithChildList(templates),
  }),
});