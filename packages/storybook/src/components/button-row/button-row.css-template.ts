import { Button, ButtonRow } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssButtonRow: ComponentImplementation<ButtonRow> = {
  component: 'buttonRow',
  implementation: 'css',
  template: ({ buttonTemplate }) => function buttonRowTemplate({ buttons }: ButtonRow) {
    return html`
      <div class="dso-button-row">
        ${buttons.map((button: Button) => buttonTemplate(button))}
      </div>
    `;
  }
}
