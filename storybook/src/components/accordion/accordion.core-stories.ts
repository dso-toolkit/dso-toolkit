import componentsReadme from "@dso-toolkit/core/src/components/accordion/components/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/accordion/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { AccordionArgs, accordionMeta, accordionStories } from "dso-toolkit";

import {
  activatableSections,
  addonsSections,
  alignmentSections,
  anchorSections,
  animatedFormGroupSections,
  basicSections,
  compactSections,
  nestedSections,
  renvooiSections,
} from "./accordion.content";
import { accordionTemplate } from "./accordion.core-template";

const meta: Meta<AccordionArgs> = {
  ...accordionMeta({ readme: `${readme}\n${componentsReadme}` }),
  title: "Core/Accordion",
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
  RenvooiSections,
  Activatable,
  AnimatedFormGroupSections,
} = accordionStories({
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
      animatedFormGroupSections: animatedFormGroupSections(),
    };
  },
});

export {
  Activatable,
  AddonsSections,
  AlignmentSections,
  AnimatedFormGroupSections,
  Compact,
  CompactBlack,
  Conclusion,
  Default,
  HandleAnchors,
  Nested,
  Neutral,
  RenvooiSections,
};
