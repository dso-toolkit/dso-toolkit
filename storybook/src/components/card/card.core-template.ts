import { Card, isButtonInterface, isToggletipInterface } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";

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
      addon,
      dsoCardClicked,
    }: Card<TemplateResult>) {
      return html`
        <dso-card ?clickable=${clickable} @dsoCardClicked=${dsoCardClicked}>
          ${selectable ? selectableTemplate(selectable) : nothing}
          ${image ? html`<img slot="image" src=${image} />` : nothing}
          ${clickable
            ? html`<a href="#" slot="heading">
                <h2>
                  <span>${label}</span>
                  <dso-icon icon="chevron-right"></dso-icon>
                </h2>
              </a>`
            : html`<h2 slot="heading">
                <span>${label}</span>
              </h2>`}
          ${addon && labelTemplate(addon)}
          ${interactions &&
          interactions.length > 0 &&
          html`<div slot="interactions">
            ${interactions.map(
              (interaction) => html`
                <div class="dso-card-interaction">
                  ${isButtonInterface(interaction) ? buttonTemplate(interaction) : nothing}
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
