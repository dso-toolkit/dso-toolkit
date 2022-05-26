import { Tooltip } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function tooltipTemplate({ position, descriptive }: Tooltip) {
  return html`
    <div
      aria-hidden=${ifDefined(!descriptive ? "true" : undefined)}
      class="tooltip fade in ${position}"
    >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">${`Ik sta: "${position}"`}</div>
    </div>
  `;
}
