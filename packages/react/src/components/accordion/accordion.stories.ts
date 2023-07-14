import { storiesOfAccordion } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";
import { addonsSections, alignmentSections, anchorSections, basicSections, subSections } from "./accordion.content";

import readme from "./readme.md?raw";

storiesOfAccordion(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ accordionTemplate }, templates) => ({
      accordionTemplate,
      basicSections,
      conclusionSections: basicSections,
      compactSections: basicSections,
      compactBlackSections: basicSections,
      neutralSections: basicSections,
      anchorSections,
      subSections: subSections(templates),
      addonsSections,
      alignmentSections,
    }),
  },
  true
);
