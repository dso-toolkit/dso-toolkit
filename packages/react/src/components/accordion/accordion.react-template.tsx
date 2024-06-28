import {
  AccordionSectionAnimationEndEvent,
  AccordionSectionToggleClickEvent,
} from "@dso-toolkit/core/dist/types/components/accordion/components/accordion-section.interfaces";
import { Accordion } from "dso-toolkit";

import * as React from "react";

import { DsoAccordion, DsoAccordionSection } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactAccordion: ComponentImplementation<Accordion<JSX.Element>> = {
  component: "accordion",
  implementation: "react",
  template: () =>
    function accordionTemplate({ variant, reverseAlign, sections }) {
      return (
        <DsoAccordion variant={variant} reverseAlign={reverseAlign}>
          {sections.map(
            (
              {
                handleTitle,
                heading,
                attachmentCount,
                content,
                dsoAnimationEnd,
                dsoToggleClick,
                handleUrl,
                icon,
                open,
                status,
                statusDescription,
                badgeStatus,
                badgeMessage,
              },
              i,
            ) => (
              <DsoAccordionSection
                key={`dsoAccordionSection-${i}`}
                open={open}
                handleTitle={handleTitle}
                heading={heading}
                handleUrl={handleUrl}
                statusDescription={statusDescription}
                status={status}
                icon={icon}
                attachmentCount={attachmentCount}
                badgeStatus={badgeStatus}
                badgeMessage={badgeMessage}
                onDsoToggleClick={(e: CustomEvent<AccordionSectionToggleClickEvent>) => {
                  dsoToggleClick?.(e);
                }}
                onDsoAnimationEnd={(e: CustomEvent<AccordionSectionAnimationEndEvent>) => {
                  dsoAnimationEnd?.(e);
                }}
              >
                {content}
              </DsoAccordionSection>
            ),
          )}
        </DsoAccordion>
      );
    },
};
