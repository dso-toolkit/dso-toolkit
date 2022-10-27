import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Card } from "@dso-toolkit/sources";
import { ComponentImplementation } from "../../templates";

export const coreCard: ComponentImplementation<Card<never>> = {
  component: "card",
  implementation: "core",
  template: ({ buttonTemplate, selectableTemplate }) =>
    function cardTemplate({ label, selectable, content, interactions, image, dsoCardClicked }: Card<TemplateResult>) {
      return html`
        <dso-card label=${ifDefined(label)} @dsoCardClicked=${dsoCardClicked}>
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
          html`<div slot="interactions" class="dso-card-interactions">
            ${interactions.map(
              (interaction) => html`<div class="dso-card-interaction">${buttonTemplate(interaction)}</div>`
            )}
          </div>`}
          <div slot="content" class="dso-rich-content">${content}</div>
        </dso-card>
      `;
    },
};
