import type { Meta } from "@storybook/react";
import { AccordionArgs, accordionMeta, accordionStories } from "dso-toolkit";

import readme from "@dso-toolkit/react/src/components/accordion/readme.md?raw";

import { templateContainer } from "../../templates";
import {
  activatableSections,
  addonsSections,
  alignmentSections,
  anchorSections,
  basicSections,
  subSections,
} from "./accordion.content";

const meta: Meta<AccordionArgs> = {
  ...accordionMeta({ readme }),
  title: "Accordion",
};

export default meta;

const {
  Default,
  Compact,
  CompactBlack,
  Neutral,
  Conclusion,
  HandleAnchors,
  Nested,
  AddonsSections,
  AlignmentSections,
  Activatable,
  RenvooiSections,
} = accordionStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { accordionTemplate } = templates;

    return {
      accordionTemplate,
      basicSections,
      addonsSections,
      alignmentSections,
      anchorSections,
      conclusionSections: basicSections,
      compactSections: basicSections,
      compactBlackSections: basicSections,
      neutralSections: basicSections,
      subSections: subSections(templates),
      renvooiSections,
      activatableSections,
    };
  },
});

export {
  Default,
  Compact,
  CompactBlack,
  Neutral,
  Conclusion,
  HandleAnchors,
  Nested,
  AddonsSections,
  AlignmentSections,
  RenvooiSections,
  Activatable,
};
