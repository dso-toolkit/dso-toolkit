import { storiesOf } from "@storybook/angular";

import { storiesOfAccordion } from "dso-toolkit";
import { templateContainer } from "../../templates";
import {
  addonsSections,
  alignmentSections,
  allowMultipleOpenSections,
  anchorSections,
  basicSections,
  compactSections,
  conclusionSections,
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
    compactSections,
    conclusionSections,
    subSections: subSections(templates),
    allowMultipleOpenSections,
    addonsSections,
    alignmentSections,
  }),
});
