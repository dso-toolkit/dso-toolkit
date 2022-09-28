import { Accordion, AccordionDemoSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { AccordionSection } from './components/accordion-section';

export function accordionTemplate(
  {
    variant,
    reverseAlign,
    multiSelectable,
    // Section
    state,
  }: Accordion & AccordionSection,
  sections: AccordionDemoSection[]
) {
  const firstSection = sections[0];

  if (firstSection) {
    firstSection.state = state;
  }

  return html`
    <dso-accordion
      variant=${ifDefined(variant)}
      ?reverse-align=${reverseAlign}
      ?multi-selectable=${multiSelectable}
    >
      ${sections.map(section => html`
        <dso-accordion-section
          ?open=${ifDefined(section.open)}
          state=${ifDefined(section.state)}
        >
          <span slot="section-handle">${section.title}</span>
          <div class="dso-rich-content">
            ${unsafeHTML(section.children)}
          </div>
        </dso-accordion-section>`
  )}
    </dso-accordion>
  `;
}
