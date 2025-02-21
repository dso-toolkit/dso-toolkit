import type { Meta } from "@storybook/web-components";
import { AccordionArgs, accordionMeta, accordionStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import {
  activatableSections,
  addonsSections,
  alignmentSections,
  anchorSections,
  basicSections,
  renvooiSections,
  nestedSections,
} from "./accordion.content";
import readme from "dso-toolkit/src/components/accordion/readme.md?raw";

const meta: Meta<AccordionArgs> = {
  ...accordionMeta({ readme }),
  title: "HTML|CSS/Accordion",
};

export default meta;

const {
  Default,
  Compact,
  CompactBlack,
  Conclusion,
  HandleAnchors,
  Nested,
  AddonsSections,
  AlignmentSections,
  RenvooiSections,
  Activatable,
} = accordionStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { accordionTemplate } = templates;

    return {
      accordionTemplate,
      basicSections: basicSections(templates),
      addonsSections,
      alignmentSections,
      anchorSections: anchorSections(templates),
      conclusionSections: basicSections(templates),
      compactSections: basicSections(templates),
      compactBlackSections: basicSections(templates),
      neutralSections: basicSections(templates),
      nestedSections: nestedSections(templates),
      renvooiSections,
      activatableSections,
    };
  },
});

export {
  Default,
  Compact,
  CompactBlack,
  Conclusion,
  HandleAnchors,
  Nested,
  AddonsSections,
  AlignmentSections,
  RenvooiSections,
  Activatable,
};
