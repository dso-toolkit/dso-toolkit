import { Accordion, AccordionDemoSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { AccordionSection } from './components/accordion-section';

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
    handleHref,
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
    firstSection.handleHref = handleHref;
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
          handle-href=${ifDefined(section.handleHref)}
          state=${ifDefined(section.state)}
          status=${ifDefined(section.status)}
          icon=${ifDefined(section.icon)}
          attachment-count=${ifDefined(section.attachmentCount)}
        >
          <span slot="section-handle">${section.title}</span>
          ${unsafeHTML(section.children)}
        </dso-accordion-section>`
  )}
    </dso-accordion>
  `;
}
