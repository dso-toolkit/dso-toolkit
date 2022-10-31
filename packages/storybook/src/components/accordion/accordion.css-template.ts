import { Accordion, AccordionSection } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from '../../templates';

export const cssAccordion: ComponentImplementation<Accordion> = {
  component: 'accordion',
  implementation: 'css',
  template: ({ attachmentsCounterTemplate, iconTemplate }) => function accordionTemplate(accordion) {
    const statusMap = new Map<string, string>([
      ['success', 'succes:'],
      ['info', 'info:'],
      ['warning', 'waarschuwing:'],
      ['danger', 'fout:']
    ]);

    function accordionHandleChildren(accordion: Accordion, section: AccordionSection) {
      return html`
        ${section.state
          ? html`<span class="sr-only">${statusMap.get(section.state)}:</span>`
          : nothing
        }

        ${section.icon && accordion.reverseAlign
          ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>`
          : nothing
        }

        ${section.handleTitle}

        ${section.icon && !accordion.reverseAlign
          ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>`
          : nothing
        }

        ${section.status
          ? html`<span class="dso-status">${section.status}</span>`
          : nothing
        }

        ${section.attachmentCount
          ? html`${attachmentsCounterTemplate({ count: section.attachmentCount })}`
          : nothing
        }
      `;
    }

    function accordionHandleContent(accordion: Accordion, section: AccordionSection) {
      const ariaExpanded = (section.open ?? false).toString();
      const children = accordionHandleChildren(accordion, section);

      if (section.handleUrl) {
        return html`
          <a
            href="${section.handleUrl}"
            class=${accordion.reverseAlign ? 'dso-right-align' : 'dso-left-align'}
            aria-expanded=${ariaExpanded}
          >
            ${children}
          </a>
        `;
      }

      return html`
        <button
          type="button"
          class=${accordion.reverseAlign ? 'dso-right-align' : 'dso-left-align'}
          aria-expanded=${ariaExpanded}
        >
          ${children}
        </button>
      `;
    }

    function accordionHandleTemplate(accordion: Accordion, section: AccordionSection) {
      const content = accordionHandleContent(accordion, section);

      switch (section.heading) {
        case 'h2':
          return html`<h2 class="dso-section-handle">${content}</h2>`;
        case 'h3':
          return html`<h3 class="dso-section-handle">${content}</h3>`;
        case 'h4':
          return html`<h4 class="dso-section-handle">${content}</h4>`;
        case 'h5':
          return html`<h5 class="dso-section-handle">${content}</h5>`;
      }
    }

    function accordionSectionTemplate(accordion: Accordion, section: AccordionSection): TemplateResult {
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

    return html`
      <div class="dso-accordion ${classMap({
        [`${accordion.variant}`]: !!accordion.variant,
        'dso-accordion-reverse-align': !!accordion.reverseAlign
      })}">
        ${accordion.sections.map(section => accordionSectionTemplate(accordion, section))}
      </div>
    `;
  }
}
