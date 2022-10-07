import { Badge } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const coreBadge: ComponentImplementation<Badge> = {
  component: 'badge',
  implementation: 'core',
  template: () => function badgeTemplate({ status, message }: Badge) {
    return html`
      <dso-badge status=${ifDefined(status)}>${message}</dso-badge>
    `;
  }
}
