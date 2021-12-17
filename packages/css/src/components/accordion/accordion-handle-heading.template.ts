import { html } from 'lit-html';

import { accordionHandleType } from './accordion-handle-type.template';

export function accordionHandleHeading(sectionHeader, section, reverseAlign) {
  if (sectionHeader === 'h2') {
    return html`
      <h2 class="dso-section-handle">
        ${accordionHandleType(section, reverseAlign)}
      </h2>
    `
  } else if (sectionHeader === 'h3') {
    return html`
      <h3 class="dso-section-handle">
        ${accordionHandleType(section, reverseAlign)}
      </h3>
    `
  } else if (sectionHeader === 'h4') {
    return html`
      <h4 class="dso-section-handle">
        ${accordionHandleType(section, reverseAlign)}
      </h4>
    `
  } else if (sectionHeader === 'h5') {
    return html`
      <h5 class="dso-section-handle">
        ${accordionHandleType(section, reverseAlign)}
      </h5>
    `
  }
}
