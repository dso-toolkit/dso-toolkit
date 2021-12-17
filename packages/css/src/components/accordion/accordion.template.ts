import { Accordion } from '@dso-toolkit/sources';

import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { accordionHandleHeading } from './accordion-handle-heading.template';

export function accordionTemplate({ variant, sections, reverseAlign }: Accordion) {
  return html`
    <div class="dso-accordion ${classMap({
      [`${variant}`]: !!variant,
      'dso-align-viewer': !!reverseAlign
    })}">
      ${sections.map(section => html`
        <div class="dso-accordion-section ${classMap({
          [`dso-${section.state}`]: !!section.state,
          'dso-open': !!section.open,
          'dso-nested-accordion': !!section.sections
        })}">
          ${accordionHandleHeading(section.header, section, reverseAlign)}

          ${section.open && html`
            <div class="dso-section-body">
              ${section.richContent && html`
                <div class="dso-rich-content">
                  ${unsafeHTML(section.richContent)}
                </div>
              `}

              ${section.sections && html`
                <div class="${variant}">
                  ${section.sections.map(subsection => html`
                    <div class="dso-accordion-section ${classMap({
                      [`dso-${subsection.state}`]: !!section.state,
                      'dso-open': !!subsection.open,
                      'dso-nested-accordion': !!subsection.sections
                    })}">
                      ${accordionHandleHeading(subsection.header, section, reverseAlign)}

                      ${subsection.open && html`
                        <div class="dso-section-body">
                          ${subsection.richContent && html`
                            <div class="dso-rich-content">
                              ${unsafeHTML(subsection.richContent)}
                            </div>
                          `}
                        </div>
                        `}
                    </div>
                  `)}
                </div>
              `}
            </div>
          `}
        </div>
      `)}
    </div>
  `
}
