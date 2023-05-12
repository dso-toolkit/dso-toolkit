import { storiesOfAccordion } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";
import {
  addonsSections,
  alignmentSections,
  allowMultipleOpenSections,
  anchorSections,
  basicSections,
  conclusionSections,
  compactSections,
  subSections,
  neutralSections,
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
    conclusionSections,
    compactSections,
    neutralSections,
    anchorSections,
    subSections: subSections(templates),
    allowMultipleOpenSections,
    addonsSections,
    alignmentSections,
  }),
});
