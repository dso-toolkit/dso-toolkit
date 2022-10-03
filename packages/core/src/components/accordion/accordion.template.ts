import { Accordion, AccordionSection, AccordionDemoSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export function accordionTemplate(
  {
    variant,
    reverseAlign,
    allowMultiple,
    dsoToggleSection,
    /* Section controls */
    open,
    status,
    state,
    attachmentCount,
    icon,
    heading,
    handleUrl,
  }: Accordion & AccordionSection,
  sections: AccordionDemoSection[]
) {
  const firstSection = sections[0];

  if (firstSection) {
    firstSection.open = open;
    firstSection.status = status;
    firstSection.state = state;
    firstSection.attachmentCount = attachmentCount;
    firstSection.icon = icon;
    firstSection.heading = heading;
    firstSection.handleUrl = handleUrl;
  }

  return html`
    <dso-accordion
      variant=${ifDefined(variant)}
      ?reverse-align=${reverseAlign}
      ?allow-multiple=${allowMultiple}
      @dsoToggleSection=${dsoToggleSection}
    >
      ${sections.map(section => html`
        <dso-accordion-section
          ?open=${ifDefined(section.open)}
          handle-title=${section.handleTitle}
          handle-url=${ifDefined(section.handleUrl)}
          state=${ifDefined(section.state)}
          status=${ifDefined(section.status)}
          icon=${ifDefined(section.icon)}
          attachment-count=${ifDefined(section.attachmentCount)}
        >
          ${unsafeHTML(section.children)}
        </dso-accordion-section>`
  )}
    </dso-accordion>
  `;
}
