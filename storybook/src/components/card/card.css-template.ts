import { Card, isButtonInterface, isToggletipInterface } from "dso-toolkit";
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
  }) =>
    function cardTemplate({
      label,
      selectable,
      content,
      interactions,
      image,
      clickable = true,
      addon,
      dsoCardClicked,
    }) {
      return html`
        <div
          class="dso-card ${classMap({
            "dso-is-selectable": !!selectable,
            "dso-has-image": !!image,
            "dso-not-clickable": !clickable,
          })}"
          @click=${ifDefined(dsoCardClicked)}
        >
          ${selectable ? html`<div class="dso-card-selectable">${selectableTemplate(selectable)}</div>` : nothing}
          ${image ? html`<div class="dso-card-image"><img slot="image" src=${image} /></div>` : nothing}
          <div class="dso-card-heading">
            ${clickable
              ? html`<a href="#">
                  <h2>
                    <span>${label}</span>
                    ${iconTemplate({ icon: "chevron-right" })}
                  </h2>
                </a>`
              : html`<h2>
                  <span>${label}</span>
                </h2>`}
            ${addon && labelTemplate(addon)}
            ${interactions &&
            interactions.length > 0 &&
            html`
              <div class="dso-card-interactions">
                ${interactions.map(
                  (interaction) => html`
                    <div class="dso-card-interaction">
                      ${isButtonInterface(interaction) ? buttonTemplate(interaction) : nothing}
                      ${isToggletipInterface(interaction) ? toggletipTemplate(interaction) : nothing}
                    </div>
                  `
                )}
              </div>
            `}
          </div>
          ${richContentTemplate({ children: content })}
        </div>
      `;
    },
};
