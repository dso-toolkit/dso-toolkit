// Keep in sync packages\css\src\components\label-group\label-group.template.ts (https://github.com/dso-toolkit/dso-toolkit/issues/1438)
import { LabelGroup } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { labelTemplate } from '../label/label.template';

export function labelGroupTemplate({ labels }: LabelGroup) {
  return html`<div class="dso-label-group">
    ${labels.map(labels => labelTemplate(labels))}
  </div>`;
}
