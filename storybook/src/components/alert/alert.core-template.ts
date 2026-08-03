import { Alert } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { buttonTemplate } from "../button/button.css-template";
import { richContentTemplate } from "../rich-content/rich-content.css-template";

export function alertTemplate({
  status,
  message,
  compact,
  interaction,
  withRoleAlert,
  closable,
  dsoClose,
}: Alert<TemplateResult>) {
  return html`
    <dso-alert
      status=${status}
      ?role-alert=${withRoleAlert}
      ?compact=${compact}
      closable=${ifDefined(closable)}
      @dsoClose=${dsoClose}
    >
      ${richContentTemplate({
        children: html` ${typeof message === "string" ? unsafeHTML(message) : message}
        ${interaction ? html`${buttonTemplate(interaction)}` : nothing}`,
      })}
    </dso-alert>
  `;
}
