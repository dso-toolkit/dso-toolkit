import { storiesOf } from "@storybook/web-components";

import { storiesOfAccordion, StoryRoot } from "dso-toolkit";

import coreAccordionReadme from "@dso-toolkit/core/src/components/accordion/readme.md?raw";
import coreAccordionSectionReadme from "@dso-toolkit/core/src/components/accordion/components/readme.md?raw";
import cssReadme from "dso-toolkit/src/components/accordion/readme.md?raw";

import { templateContainer } from "../../templates";
import { addonsSections, alignmentSections, anchorSections, basicSections, subSections } from "./accordion.content";

storiesOfAccordion({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ accordionTemplate }, templates) => ({
    accordionTemplate,
    basicSections: basicSections(templates),
    addonsSections,
    alignmentSections,
    anchorSections: anchorSections(templates),
    conclusionSections: basicSections(templates),
    compactSections: basicSections(templates),
    compactBlackSections: basicSections(templates),
    neutralSections: basicSections(templates),
    subSections: subSections(templates),
  }),
});

storiesOfAccordion(
  {
    parameters: {
      storiesOf,
      module,
      readme: `${coreAccordionReadme}\n${coreAccordionSectionReadme}`,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ accordionTemplate }, templates) => {
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
        subSections: subSections(templates),
      };
    },
  },
  true
);
