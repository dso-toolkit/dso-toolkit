import {
  AccordionSectionToggleAnimationEndEvent,
  AccordionSectionToggleEvent,
} from "@dso-toolkit/core/dist/types/components/accordion/accordion.interfaces";
import { Accordion } from "dso-toolkit";

import * as React from "react";

import { DsoAccordion, DsoAccordionSection } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactAccordion: ComponentImplementation<Accordion<JSX.Element>> = {
  component: "accordion",
  implementation: "react",
  template: () =>
    function accordionTemplate({
      group,
      variant,
      reverseAlign,
      allowMultipleOpen,
      dsoToggleSection,
      dsoToggleSectionAnimationEnd,
      sections,
    }) {
      return (
        <>
          <DsoAccordion
            group={group}
            variant={variant}
            reverseAlign={reverseAlign}
            allowMultipleOpen={allowMultipleOpen}
            onDsoToggleSection={(e: CustomEvent<AccordionSectionToggleEvent>) => {
              /* eslint-disable @typescript-eslint/no-explicit-any */
              e.detail.section.element = "elementRef" as any;
              e.detail.sections = ["elementRef"] as any;
              /* eslint-enable @typescript-eslint/no-explicit-any */

              dsoToggleSection?.(e);
            }}
            onDsoToggleSectionAnimationEnd={(e: CustomEvent<AccordionSectionToggleAnimationEndEvent>) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              e.detail.section.element = "elementRef" as any;

              dsoToggleSectionAnimationEnd?.(e);
            }}
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
          {group && (
            <DsoAccordion
              group={group}
              variant={variant}
              reverseAlign={reverseAlign}
              allowMultipleOpen={allowMultipleOpen}
              onDsoToggleSection={(e: CustomEvent<AccordionSectionToggleEvent>) => {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                e.detail.section.element = "elementRef" as any;
                e.detail.sections = ["elementRef"] as any;
                /* eslint-enable @typescript-eslint/no-explicit-any */

                dsoToggleSection?.(e);
              }}
              onDsoToggleSectionAnimationEnd={(e: CustomEvent<AccordionSectionToggleAnimationEndEvent>) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                e.detail.section.element = "elementRef" as any;

                dsoToggleSectionAnimationEnd?.(e);
              }}
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
          )}
        </>
      );
    },
};
