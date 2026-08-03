import { html } from "lit-html";

import { buttonTemplate } from "../button/button.template.js";

import { FormButtons } from "./form-buttons.models.js";

export function formButtonsTemplate({ buttons, asideButtons }: FormButtons) {
  return html` <div class="dso-form-buttons">
    ${
      asideButtons &&
      asideButtons.length > 0 &&
      html`<div class="dso-aside">${asideButtons.map((button) => buttonTemplate(button))}</div>`
    }
    ${buttons.map((button) => buttonTemplate(button))}
  </div>`;
}
