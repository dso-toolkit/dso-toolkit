import { Card, isButtonInterface, isToggletipInterface } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreCard: ComponentImplementation<Card<never>> = {
  component: "card",
  implementation: "core",
  template: ({ buttonTemplate, selectableTemplate, toggletipTemplate }) =>
    function cardTemplate({ label, selectable, content, interactions, image, dsoCardClicked }: Card<TemplateResult>) {
      return html`
        <dso-card @dsoCardClicked=${dsoCardClicked}>
          ${selectable ? selectableTemplate(selectable) : nothing}
          ${image ? html`<img slot="image" src=${image} />` : nothing}
          <a slot="heading" href="#">
            <h2>
              <span>${label}</span>
              <dso-icon icon="chevron-right"></dso-icon>
            </h2>
          </a>
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
          <div class="dso-rich-content" slot="content">${content}</div>
        </dso-card>
      `;
    },
};
