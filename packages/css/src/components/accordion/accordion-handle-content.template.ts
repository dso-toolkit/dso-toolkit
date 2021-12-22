import { Accordion, AccordionSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { accordionHandleChildren } from './accordion-handle-children.template';

export function accordionHandleContent(accordion: Accordion, section: AccordionSection) {
  const children =  accordionHandleChildren(accordion, section);

  switch (section.handleType) {
    case 'anchor':
      return html`
        <a href="#" aria-expanded="${ifDefined(open?.toString())}">
          ${children}
        </a>
      `;
    case 'button':
      return html`
        <button type="button" aria-expanded="${ifDefined(open?.toString())}">
          ${children}
        </button>
      `;
  }
}
