import { Card, isButtonInterface, isToggletipInterface, isLabelInterface } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";
import { DsoCardCustomEvent, DsoCardClickedEvent } from "@dso-toolkit/core";

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
      imageShape,
      clickable = false,
      href,
      dsoCardClicked,
    }: Card<TemplateResult>) {
      return html`
        <dso-card
          href=${ifDefined((!clickable && href) || undefined)}
          clickable=${clickable}
          image-shape=${ifDefined(imageShape)}
          @dsoCardClicked=${(e: DsoCardCustomEvent<DsoCardClickedEvent>) => {
            if (!e.detail.isModifiedEvent) {
              e.detail.originalEvent?.preventDefault();
            }

            dsoCardClicked?.(e);
          }}
        >
          ${selectable ? selectableTemplate(selectable) : nothing}
          ${image ? html`<img slot="image" src=${image} />` : nothing}
          ${clickable && href
            ? html`<a href=${href} slot="heading" @click=${(e: MouseEvent) => e.preventDefault()}>
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
                  ${isButtonInterface(interaction)
                    ? buttonTemplate(interaction)
                    : isLabelInterface(interaction)
                      ? labelTemplate(interaction)
                      : isToggletipInterface(interaction)
                        ? toggletipTemplate(interaction)
                        : nothing}
                </div>
              `,
            )}
          </div>`}
          ${content && richContentTemplate({ children: content, slot: "content" })}
        </dso-card>
      `;
    },
};
