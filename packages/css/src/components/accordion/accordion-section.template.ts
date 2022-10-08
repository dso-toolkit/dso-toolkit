import { Accordion, AccordionSection } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { accordionHandleTemplate } from './accordion-handle.template';

export function accordionSectionTemplate(accordion: Accordion, section: AccordionSection): TemplateResult {
  const hasNestedAccordion = section.content?.includes('<dso-accordion') ?? false;

  return html`
    <div class="dso-accordion-section ${classMap({
      [`dso-${section.state}`]: !!section.state,
      'dso-open': !!section.open,
      'dso-nested-accordion': hasNestedAccordion,
    })}">
      ${accordionHandleTemplate(accordion, section)}

      ${section.open
        ? html`
          <div class="dso-section-body">
            ${unsafeHTML(section.content)}
          </div>
        `
        : nothing
      }
    </div>
  `;
}
