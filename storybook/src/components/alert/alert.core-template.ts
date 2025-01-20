import { Alert } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const coreAlert: ComponentImplementation<Alert<TemplateResult>> = {
  component: "alert",
  implementation: "core",
  template: ({ richContentTemplate }) =>
    function alertTemplate({ status, message, compact, onClick, withRoleAlert, closable, dsoClose }) {
      return html`
        <dso-alert
          status=${status}
          ?role-alert=${withRoleAlert}
          ?compact=${compact}
          closable=${ifDefined(closable)}
          @dsoClose=${dsoClose}
        >
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
