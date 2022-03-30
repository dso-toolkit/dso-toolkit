import { Accordion } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

import { accordionSectionTemplate } from './accordion-section.template';

export function accordionTemplate(accordion: Accordion) {
  return html`
    <div class="dso-accordion ${classMap({
      [`${accordion.variant}`]: !!accordion.variant,
      'dso-accordion-reverse-align': !!accordion.reverseAlign
    })}">
      ${accordion.sections.map(section => accordionSectionTemplate(accordion, section))}
    </div>
  `;
}
