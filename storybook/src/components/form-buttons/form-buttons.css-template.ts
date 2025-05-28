import { Button, FormButtons } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssFormButtons: ComponentImplementation<FormButtons> = {
  component: "formButtons",
  implementation: "html-css",
  template: ({ buttonTemplate }) =>
    function formButtonsTemplate({ buttons, asideButtons }) {
      return html` <div class="dso-form-buttons">
        ${asideButtons &&
        asideButtons.length > 0 &&
        html`<div class="dso-aside">${asideButtons.map((button: Button) => buttonTemplate(button))}</div>`}
        ${buttons.map((button) => buttonTemplate(button))}
      </div>`;
    },
};
