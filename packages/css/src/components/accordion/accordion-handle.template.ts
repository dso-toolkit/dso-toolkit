import { Accordion, AccordionDemoSection } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { accordionHandleContent } from './accordion-handle-content.template';

export function accordionHandleTemplate(accordion: Accordion, section: AccordionDemoSection) {
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
