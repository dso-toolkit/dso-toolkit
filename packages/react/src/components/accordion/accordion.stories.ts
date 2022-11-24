import { storiesOfAccordion } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";
import {
  addonsSections,
  alignmentSections,
  allowMultipleOpenSections,
  anchorSections,
  basicSections,
  subSections,
} from "./accordion.content";

import readme from "./readme.md";

storiesOfAccordion({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ accordionTemplate }, templates) => ({
    accordionTemplate,
    basicSections,
    anchorSections,
    subSections: subSections(templates),
    allowMultipleOpenSections,
    addonsSections,
    alignmentSections,
  }),
});
