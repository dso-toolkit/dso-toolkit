import { CardClickEvent, DsoCardCustomEvent } from "@dso-toolkit/core";
import { Card, isButtonInterface, isLabelInterface, isSlideToggleInterface, isToggletipInterface } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreCard: ComponentImplementation<Card<never>> = {
  component: "card",
  implementation: "core",
  template: ({
    buttonTemplate,
    labelTemplate,
    richContentTemplate,
    selectableTemplate,
    toggletipTemplate,
    slideToggleTemplate,
  }) =>
    function cardTemplate({
      label,
      selectable,
      content,
      interactions,
      href,
      active,
      mode,
      dsoCardClick,
    }: Card<TemplateResult>) {
      return html`
        <dso-card
          href=${href}
          mode=${ifDefined(mode || undefined)}
          ?active=${active}
          @dsoCardClick=${(e: DsoCardCustomEvent<CardClickEvent>) => {
            if (!e.detail.isModifiedEvent) {
              e.detail.originalEvent.preventDefault();
            }

            dsoCardClick?.(e);
          }}
        >
          ${selectable ? selectableTemplate(selectable) : nothing}
          ${html`<h2 slot="heading" id="card-title">${label}</h2>`}
          ${interactions && interactions.length > 0
            ? html`<div slot="interactions">
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
              </div>`
            : nothing}
          ${content && richContentTemplate({ children: content, slot: "content" })}
        </dso-card>
      `;
    },
};
