import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { accordionHandleChildren } from './accordion-handle-children.template';

export function accordionHandleType(section, reverseAlign) {
  if (section.type === 'link') {
    return html`
      <a href="#" aria-expanded="${ifDefined(section.open ? 'true' : 'false')}">
        ${accordionHandleChildren(section, reverseAlign)}
      </a>
    `;
  } else {
    return html`
      <button type="button" aria-expanded="${ifDefined(section.open ? 'true' : 'false')}">
        ${accordionHandleChildren(section, reverseAlign)}
      </button>
    `;
  }
}
