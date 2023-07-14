import { storiesOf } from "@storybook/web-components";
import { TemplateResult } from "lit-html";

import { AccordionSection, AccordionSectionToggleEvent, storiesOfAccordion, StoryRoot } from "dso-toolkit";

import coreReadme from "@dso-toolkit/core/src/components/accordion/readme.md?raw";
import cssReadme from "dso-toolkit/src/components/accordion/readme.md?raw";

import { templateContainer, Templates } from "../../templates";
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
  storyTemplates: ({ accordionTemplate }: Templates, templates: Templates) => {
    type AccordionConnector = (
      parameters: Parameters<
        ReturnType<Parameters<typeof storiesOfAccordion>[0]["storyTemplates"]>["accordionTemplate"]
      >
    ) => Parameters<typeof accordionTemplate>[0];

    const accordionConnector: AccordionConnector = ([props]) => ({
      ...props,
      dsoToggleSection(e: CustomEvent<AccordionSectionToggleEvent>) {
        const section = e.detail.section.element;

        if (isAccordionSection(section)) {
          e.detail.section.open ? section.removeAttribute("open") : section.setAttribute("open", "");
        }

        if (props.dsoToggleSection) {
          props.dsoToggleSection(e);
        }
      },
      sections: props.sections as AccordionSection<TemplateResult>[],
    });

    return {
      accordionTemplate: (props) => accordionTemplate(accordionConnector([props])),
      basicSections: basicSections(templates),
      addonsSections,
      alignmentSections,
      allowMultipleOpenSections: allowMultipleOpenSections(templates),
      anchorSections: anchorSections(templates),
      conclusionSections: basicSections(templates),
      compactSections: basicSections(templates),
      neutralSections: basicSections(templates),
      subSections: subSections(templates),
    };
  },
});

function isAccordionSection(element: Element): element is HTMLDsoAccordionSectionElement {
  return element.tagName === "DSO-ACCORDION-SECTION";
}
