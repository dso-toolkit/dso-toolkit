import { Accordion, AccordionDemoSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export function accordionTemplate(
  {
    variant,
    handleElement,
    reverseAlign,
    multiSelectable,
  }: Accordion,
  sections: AccordionDemoSection[]
) {
  return html`
    <dso-accordion
      variant=${ifDefined(variant)}
      handle-element=${ifDefined(handleElement)}
      ?reverse-align=${reverseAlign}
      ?multi-selectable=${multiSelectable}
    >
      ${sections.map(section => html`
        <dso-accordion-section
          ?open=${ifDefined(section.open)}
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
