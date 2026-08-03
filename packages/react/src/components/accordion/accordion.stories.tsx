import type { Meta } from "@storybook/react-vite";
import { AccordionArgs, accordionMeta, accordionStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import {
  activatableSections,
  addonsSections,
  alignmentSections,
  anchorSections,
  basicSections,
  compactSections,
  nestedSections,
  renvooiSections,
} from "./accordion.content";
import { accordionTemplate } from "./accordion.react-template";
import readme from "./readme.md?raw";

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
  storyTemplates: () => {
    return {
      accordionTemplate,
      basicSections,
      addonsSections,
      alignmentSections,
      anchorSections,
      conclusionSections: basicSections,
      compactSections,
      compactBlackSections: basicSections,
      neutralSections: basicSections,
      nestedSections,
      renvooiSections,
      activatableSections,
    };
  },
});

export {
  Activatable,
  AddonsSections,
  AlignmentSections,
  Compact,
  CompactBlack,
  Conclusion,
  Default,
  HandleAnchors,
  Nested,
  Neutral,
  RenvooiSections,
};
