import { Button, FormButtons } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const cssFormButtons: ComponentImplementation<FormButtons> = {
  component: 'formButtons',
  implementation: 'css',
  template: ({ buttonTemplate }) => function formButtonsTemplate({ formModifier, buttons, asideButtons }: FormButtons) {
    return html`
      <form
        class=${ifDefined(formModifier)}
      >
        <div class="dso-form-buttons">
          ${asideButtons && asideButtons.length > 0 && html`
            <div class="dso-aside">
              ${asideButtons.map((button: Button) => buttonTemplate(button))}
            </div>
          `}

          ${buttons.map((button: Button) => buttonTemplate(button))}
        </div>
      </form>
    `;
  }
}
