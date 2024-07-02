import { Alert } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const coreAlert: ComponentImplementation<Alert<TemplateResult>> = {
  component: "alert",
  implementation: "core",
  template: ({ richContentTemplate }) =>
    function alertTemplate({ status, message, small, onClick, withRoleAlert }) {
      return html`
        <dso-alert status=${status} ?role-alert=${withRoleAlert} ?small=${small}>
          ${richContentTemplate({
            children: html`
              ${typeof message === "string" ? unsafeHTML(message) : message}
              ${onClick
                ? html`<button type="button" class="dso-alert-button" @click=${onClick}><span>Button</span></button>`
                : nothing}
            `,
          })}
        </dso-alert>
      `;
    },
};
