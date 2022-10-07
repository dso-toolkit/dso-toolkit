import { LabelGroup } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssLabelGroup: ComponentImplementation<LabelGroup> = {
  component: 'labelGroup',
  implementation: 'css',
  template: ({ labelTemplate }) => function labelGroupTemplate({ labels }: LabelGroup) {
    return html`<div class="dso-label-group">
      <ul>
        ${labels.map(label => html`
          <li>${labelTemplate(label)}</li>
        `)}
      </ul>
  </div>`;
  }
}
