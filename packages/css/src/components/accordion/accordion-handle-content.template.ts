import { Accordion, AccordionDemoSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { accordionHandleChildren } from './accordion-handle-children.template';

export function accordionHandleContent(accordion: Accordion, section: AccordionDemoSection) {
  const ariaExpanded = (section.open ?? false).toString();
  const children =  accordionHandleChildren(accordion, section);

  switch (accordion.handleElement) {
    case 'button':
      return html`
        <button type="button" aria-expanded=${ariaExpanded}>
          ${children}
        </button>
      `;
    case 'anchor':
    default:
      return html`
        <a href="#" aria-expanded=${ariaExpanded}>
          ${children}
        </a>
      `;
  }
}
