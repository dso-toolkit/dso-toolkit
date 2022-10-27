import { Accordion } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ComponentImplementation } from '../../templates';

export const coreAccordion: ComponentImplementation<Accordion> = {
  component: 'accordion',
  implementation: 'core',
  template: () => function accordionTemplate({
    variant,
    reverseAlign,
    allowMultipleOpen,
    dsoToggleSection,
    sections
  }) {
    return html`
      <dso-accordion
        variant=${ifDefined(variant)}
        ?reverse-align=${reverseAlign}
        ?allow-multiple-open=${allowMultipleOpen}
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
            ${unsafeHTML(section.content)}
          </dso-accordion-section>`
        )}
      </dso-accordion>
    `;
  }
}
