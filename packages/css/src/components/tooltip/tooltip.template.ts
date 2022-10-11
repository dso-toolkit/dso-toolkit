import { Tooltip } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function tooltipTemplate({ position, descriptive }: Tooltip) {
  return html`
    <div
      aria-hidden=${ifDefined(!descriptive || undefined)}
      class="tooltip fade in ${position}"
      role="tooltip"
    >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">${`Ik sta: "${position}"`}</div>
    </div>
  `;
}
