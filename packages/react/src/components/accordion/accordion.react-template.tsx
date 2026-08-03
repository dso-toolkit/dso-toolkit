import {
  Accordion,
  AccordionSectionActiveChangeEvent,
  AccordionSectionAnimationEndEvent,
  AccordionSectionToggleClickEvent,
} from "dso-toolkit";
import { SlottableTemplate } from "dso-toolkit/dist/template-container";
import React from "react";

import { DsoAccordion, DsoAccordionSection } from "../..";

export function accordionTemplate({
  variant,
  reverseAlign,
  sections,
}: Accordion<React.JSX.Element> & SlottableTemplate) {
  return (
    <DsoAccordion variant={variant} reverseAlign={reverseAlign}>
      {sections.map(
        (
          {
            handleTitle,
            wijzigactie,
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
            labelStatus,
            label,
            activatable,
            active,
            dsoActiveChange,
          },
          i,
        ) => (
          <DsoAccordionSection
            key={`dsoAccordionSection-${i}`}
            open={open}
            handleTitle={handleTitle}
            wijzigactie={wijzigactie}
            heading={heading}
            handleUrl={handleUrl}
            statusDescription={statusDescription}
            status={status}
            icon={icon}
            attachmentCount={attachmentCount}
            labelStatus={labelStatus}
            label={label}
            activatable={activatable}
            active={active}
            onDsoToggleClick={(e: CustomEvent<AccordionSectionToggleClickEvent>) => {
              dsoToggleClick?.(e);
            }}
            onDsoAnimationEnd={(e: CustomEvent<AccordionSectionAnimationEndEvent>) => {
              dsoAnimationEnd?.(e);
            }}
            onDsoActiveChange={(e: CustomEvent<AccordionSectionActiveChangeEvent>) => {
              dsoActiveChange?.(e);
            }}
          >
            {content}
          </DsoAccordionSection>
        ),
      )}
    </DsoAccordion>
  );
}
