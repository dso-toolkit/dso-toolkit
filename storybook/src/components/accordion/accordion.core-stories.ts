import type { Meta } from "@storybook/web-components";
import { AccordionArgs, accordionMeta, accordionStories } from "dso-toolkit";

import readme from "@dso-toolkit/core/src/components/accordion/readme.md?raw";
import componentsReadme from "@dso-toolkit/core/src/components/accordion/components/readme.md?raw";

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
  Neutral,
  Conclusion,
  HandleAnchors,
  RenvooiSections,
  Nested,
  AddonsSections,
  AlignmentSections,
  Activatable,
};
