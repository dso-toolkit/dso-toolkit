import { Tooltip } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const coreTooltip: ComponentImplementation<Tooltip> = {
  component: 'tooltip',
  implementation: 'core',
  template: () => function tooltipTemplate({ active, descriptive, position, label, id }) {
    return html`<dso-tooltip ?descriptive=${ifDefined(descriptive)} position=${position} for=${ifDefined(id)} ?active=${active}>
      ${label}
    </dso-tooltip>`;
  }
}
