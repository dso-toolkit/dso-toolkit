import { InputNumber } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { buttonTemplate } from '../button/button.template';

export function inputNumberTemplate({ label, id, min, max, count, minusButtonInactive, plusButtonInactive }: InputNumber) {
  return html`
    <div class="dso-input-number">
      ${label && html`
        <label for=${id} class="control-label">
          ${label}
        </label>
      `}
      ${buttonTemplate({ type: 'button', label: 'Aantal verlagen', modifier: 'dso-tertiary', disabled: minusButtonInactive, icon: { icon: 'minus-square' }, iconMode: 'only' })}
      <input
        type="number"
        id=${id}
        readonly
        tabindex="-1"
        ?min=${min}
        ?max=${max}
        class="dso-input-step-counter"
        value=${count}
      >
      ${buttonTemplate({ type: 'button', label: 'Aantal verhogen', modifier: 'dso-tertiary', disabled: plusButtonInactive, icon: { icon: 'plus-square' }, iconMode: 'only' })}
    </div>
  `;
}
