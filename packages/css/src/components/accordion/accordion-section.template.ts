import { Accordion, AccordionSection } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { accordionHandleTemplate } from './accordion-handle.template';
import { accordionTemplate } from './accordion.template';

export function accordionSectionTemplate(accordion: Accordion, section: AccordionSection): TemplateResult {
  return html`
    <div class="dso-accordion-section ${classMap({
      [`dso-${section.state}`]: !!section.state,
      'dso-open': !!section.open,
      'dso-nested-accordion': section.subsections?.length ?? false
    })}">
      ${accordionHandleTemplate(accordion, section)}

      ${section.open
        ? html`
          <div class="dso-section-body">
            ${unsafeHTML(section.children)}

            ${section.subsections && section.subsections.length > 0
              ? accordionTemplate({ sections: section.subsections })
              : nothing
            }
          </div>
        `
        : nothing
      }
    </div>
  `;
}
