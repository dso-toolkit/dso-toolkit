import { Card, isButtonInterface, isToggletipInterface, isLabelInterface } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreCard: ComponentImplementation<Card<never>> = {
  component: "card",
  implementation: "core",
  template: ({ buttonTemplate, labelTemplate, richContentTemplate, selectableTemplate, toggletipTemplate }) =>
    function cardTemplate({
      label,
      selectable,
      content,
      interactions,
      image,
      clickable = true,
      dsoCardClicked,
    }: Card<TemplateResult>) {
      return html`
        <dso-card clickable=${ifDefined(clickable)} @dsoCardClicked=${dsoCardClicked}>
          ${selectable ? selectableTemplate(selectable) : nothing}
          ${image ? html`<img slot="image" src=${image} />` : nothing}
          ${clickable
            ? html`<a href="#" slot="heading">
                <h2>
                  <span id="card-title">${label}</span>
                  <dso-icon icon="chevron-right"></dso-icon>
                </h2>
              </a>`
            : html`<h2 slot="heading">
                <span id="card-title">${label}</span>
              </h2>`}
          ${interactions &&
          interactions.length > 0 &&
          html`<div slot="interactions">
            ${interactions.map(
              (interaction) => html`
                <div class="dso-card-interaction">
                  ${isButtonInterface(interaction) ? buttonTemplate(interaction) : nothing}
                  ${isLabelInterface(interaction) ? labelTemplate(interaction) : nothing}
                  ${isToggletipInterface(interaction) ? toggletipTemplate(interaction) : nothing}
                </div>
              `
            )}
          </div>`}
          ${richContentTemplate({ children: content, slot: "content" })}
        </dso-card>
      `;
    },
};
