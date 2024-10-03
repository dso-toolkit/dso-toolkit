import { Card, isButtonInterface, isLabelInterface, isSlideToggleInterface, isToggletipInterface } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssCard: ComponentImplementation<Card<TemplateResult>> = {
  component: "card",
  implementation: "html-css",
  template: ({
    buttonTemplate,
    iconTemplate,
    labelTemplate,
    richContentTemplate,
    selectableTemplate,
    toggletipTemplate,
    slideToggleTemplate,
  }) =>
    function cardTemplate({ label, selectable, content, interactions, href, mode, dsoCardClick }) {
      return html`
        <div
          class="dso-card ${classMap({
            "dso-is-selectable": !!selectable,
          })}"
          @click=${ifDefined(dsoCardClick)}
        >
          <div class="dso-card-container">
            ${selectable ? html`<div class="dso-card-selectable">${selectableTemplate(selectable)}</div>` : nothing}
            <div class="dso-card-heading">
              ${html`<a href=${href} @click=${(e: MouseEvent) => e.preventDefault()}>
                <h2>
                  <span id="card-title">${label}</span>
                  ${iconTemplate({
                    icon: mode === "extern" ? "external-link" : mode === "download" ? "download" : "chevron-right",
                  })}
                </h2>
              </a>`}
              ${interactions && interactions.length > 0
                ? html`
                    <div class="dso-card-interactions">
                      ${interactions.map(
                        (interaction) => html`
                          <div class="dso-card-interaction">
                            ${isButtonInterface(interaction) ? buttonTemplate(interaction) : nothing}
                            ${isLabelInterface(interaction) ? labelTemplate(interaction) : nothing}
                            ${isToggletipInterface(interaction) ? toggletipTemplate(interaction) : nothing}
                            ${isSlideToggleInterface(interaction) ? slideToggleTemplate(interaction) : nothing}
                          </div>
                        `,
                      )}
                    </div>
                  `
                : nothing}
            </div>
            ${content && richContentTemplate({ children: content })}
          </div>
        </div>
      `;
    },
};
