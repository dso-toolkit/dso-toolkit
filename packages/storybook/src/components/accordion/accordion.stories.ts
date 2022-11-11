import { storiesOfAccordion } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";

import cssReadme from "@dso-toolkit/css/src/components/accordion/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/accordion/readme.md";

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
    basicSections,
    addonsSections,
    alignmentSections,
    allowMultipleOpenSections,
    anchorSections,
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
    basicSections,
    addonsSections,
    alignmentSections,
    allowMultipleOpenSections,
    anchorSections,
    subSections: subSections(templates),
  }),
});
