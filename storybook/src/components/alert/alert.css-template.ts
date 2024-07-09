import { Alert } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { classMap } from "lit-html/directives/class-map.js";
import { ComponentImplementation } from "../../templates";

// Todo: Move to dso-toolkit
const statusMap = new Map<string, string>([
  ["success", "Gelukt"],
  ["info", "Opmerking"],
  ["warning", "Waarschuwing"],
  ["error", "Fout"],
]);

export const cssAlert: ComponentImplementation<Alert<TemplateResult>> = {
  component: "alert",
  implementation: "html-css",
  template: ({ richContentTemplate }) =>
    function alertTemplate({ status, message, compact, onClick, withRoleAlert }) {
      return html`
        <div
          class="alert ${classMap({ [`alert-${status}`]: status, "dso-compact": !!compact })}"
          role=${ifDefined(withRoleAlert ? "alert" : undefined)}
        >
          <span class="sr-only">${statusMap.get(status)}:</span>
          ${richContentTemplate({
            children: html`
              ${typeof message === "string" ? unsafeHTML(message) : message}
              ${onClick
                ? html`<button type="button" class="dso-alert-button" @click=${onClick}><span>Button</span></button>`
                : nothing}
            `,
          })}
        </div>
      `;
    },
};
