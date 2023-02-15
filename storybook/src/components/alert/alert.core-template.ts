import { Alert } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const coreAlert: ComponentImplementation<Alert<TemplateResult>> = {
  component: "alert",
  implementation: "core",
  template: ({ buttonTemplate, richContentTemplate }) =>
    function alertTemplate({ status, message, onClick, withRoleAlert }) {
      return html`
        <dso-alert status=${status} ?role-alert=${withRoleAlert}>
          ${richContentTemplate({
            children: html`
              ${typeof message === "string" ? unsafeHTML(message) : message}
              ${onClick ? buttonTemplate({ label: "Button", onClick, variant: null, modifier: "btn" }) : nothing}
            `,
          })}
        </dso-alert>
      `;
    },
};
