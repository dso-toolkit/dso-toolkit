import { LabelGroup } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { labelTemplate } from '@dso-toolkit/core/src/components/label/label.template';

export function labelGroupTemplate({ labels }: LabelGroup) {
  return html`<ul class="dso-label-group">
    ${labels.map(label => html`
      <li>${labelTemplate(label)}</li>
    `)}
  </ul>`;
}
