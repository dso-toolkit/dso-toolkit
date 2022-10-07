import { Badge } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssBadge: ComponentImplementation<Badge> = {
  component: 'badge',
  implementation: 'css',
  template: () => function badgeTemplate({ status, message }: Badge) {
    return html`
      <span class="dso-badge ${status ? `badge-${status}` : ''}">
        ${message}
      </span>`;
  }
}
