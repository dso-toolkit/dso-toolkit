import { Accordion } from '@dso-toolkit/sources';

import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { accordionHandleHeading } from './accordion-handle-heading.template';

export function accordionTemplate({ variant, sections, reverseAlign }: Accordion) {
  return html`
    <div class="dso-accordion ${classMap({
      [variant]: !!variant,
      'dso-accordion-reverse-align': !!reverseAlign
    })}">
      ${sections.map(section => html`
        <div class="dso-accordion-section ${classMap({
          [`dso-${section.state}`]: !!section.state,
          'dso-open': section.open,
          'dso-nested-accordion': section.subsections ? section.subsections.length > 0 : false
        })}">
          ${accordionHandleHeading(section.header, section, reverseAlign)}

          ${section.open ? html`
            <div class="dso-section-body">
              ${section.richContent
                ? html`
                  <div class="dso-rich-content">
                    ${unsafeHTML(section.richContent)}
                  </div>
                `
                : nothing
              }

              ${section.subsections
                ? html`
                  ${section.subsections.map(subsection => html`
                    <div class="dso-accordion-section ${classMap({
                      [`dso-${subsection.state}`]: !!section.state,
                      'dso-open': !!subsection.open,
                      'dso-nested-accordion': subsection.subsections ? subsection.subsections.length > 0 : false
                    })}">
                      ${accordionHandleHeading(subsection.header, subsection, reverseAlign)}

                      ${subsection.open
                        ? html`
                          <div class="dso-section-body">
                            ${subsection.richContent
                              ? html`
                                <div class="dso-rich-content">
                                  ${unsafeHTML(subsection.richContent)}
                                </div>
                              `
                              : nothing
                            }
                          </div>
                        `
                        : nothing
                      }
                    </div>
                  `)}
                `
                : nothing
              }
            </div>
          `
          : nothing
          }
        </div>
      `)}
    </div>
  `
}
