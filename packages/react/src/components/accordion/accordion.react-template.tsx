import { Accordion } from "dso-toolkit";

import * as React from "react";

import { DsoAccordion, DsoAccordionSection } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactAccordion: ComponentImplementation<Accordion<JSX.Element>> = {
  component: "accordion",
  implementation: "react",
  template: () =>
    function accordionTemplate({ variant, reverseAlign, allowMultipleOpen, dsoToggleSection, sections }) {
      return (
        <DsoAccordion
          variant={variant}
          reverseAlign={reverseAlign}
          allowMultipleOpen={allowMultipleOpen}
          onDsoToggleSection={dsoToggleSection}
        >
          {sections.map((section, i) => (
            <DsoAccordionSection
              key={`dsoAccordionSection-${i}`}
              open={section.open}
              handleTitle={section.handleTitle}
              heading={section.heading}
              handleUrl={section.handleUrl}
              state={section.state}
              status={section.status}
              icon={section.icon}
              attachmentCount={section.attachmentCount}
            >
              {section.content}
            </DsoAccordionSection>
          ))}
        </DsoAccordion>
      );
    },
};
