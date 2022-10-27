import { Card } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssCard: ComponentImplementation<Card<TemplateResult>> = {
  component: "card",
  implementation: "css",
  template: ({ buttonTemplate, iconTemplate, selectableTemplate }) =>
    function cardTemplate({ label, selectable, content, interactions, image, dsoCardClicked }) {
      return html`
        <div
          class="dso-card ${classMap({ "dso-is-selectable": !!selectable, "dso-has-image": !!image })}"
          @click=${ifDefined(dsoCardClicked)}
        >
          ${selectable ? html`<div class="dso-card-selectable">${selectableTemplate(selectable)}</div>` : nothing}
          ${image ? html`<div class="dso-card-image"></div>` : nothing}
          <div class="dso-card-heading">
            <a href="#">
              <h2>
                <span>${label}</span>
                ${iconTemplate({ icon: "chevron-right" })}
              </h2>
            </a>
            ${interactions &&
            interactions.length > 0 &&
            html`
              <div class="dso-card-interactions">
                ${interactions.map(
                  (interaction) => html`<div class="dso-card-interaction">${buttonTemplate(interaction)}</div>`
                )}
              </div>
            `}
          </div>
          <div class="dso-rich-content">${content}</div>
        </div>
      `;
    },
};
