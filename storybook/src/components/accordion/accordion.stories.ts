import { storiesOfAccordion, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/accordion/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/accordion/readme.md?raw";

import { templateContainer } from "../../templates";
import {
  addonsSections,
  alignmentSections,
  allowMultipleOpenSections,
  anchorSections,
  basicSections,
  subSections,
} from "./accordion.content";

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
    allowMultipleOpenSections: allowMultipleOpenSections(templates),
    anchorSections: anchorSections(templates),
    conclusionSections: basicSections(templates),
    compactSections: basicSections(templates),
    neutralSections: basicSections(templates),
    subSections: subSections(templates),
  }),
});

storiesOfAccordion({
  parameters: {
    storiesOf,
    module,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ accordionTemplate }, templates) => ({
    accordionTemplate,
    basicSections: basicSections(templates),
    addonsSections,
    alignmentSections,
    allowMultipleOpenSections: allowMultipleOpenSections(templates),
    anchorSections: anchorSections(templates),
    conclusionSections: basicSections(templates),
    compactSections: basicSections(templates),
    neutralSections: basicSections(templates),
    subSections: subSections(templates),
  }),
});
