import { storiesOf } from "@storybook/angular";

import { storiesOfAccordion } from "../../../sources";
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
