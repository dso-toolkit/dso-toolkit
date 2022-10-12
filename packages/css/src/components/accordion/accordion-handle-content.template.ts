import { Accordion, AccordionSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { accordionHandleChildren } from './accordion-handle-children.template';

export function accordionHandleContent(accordion: Accordion, section: AccordionSection) {
  const ariaExpanded = (section.open ?? false).toString();
  const children = accordionHandleChildren(accordion, section);

  if (section.handleUrl) {
    return html`
        <a href="${section.handleUrl}" aria-expanded=${ariaExpanded}>
          ${children}
        </a>
      `;
  }

  return html`
    <button type="button" aria-expanded=${ariaExpanded}>
      ${children}
    </button>
  `;
}
