import { DsoCardCustomEvent } from "@dso-toolkit/core";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { isButtonInterface } from "../button/button.models.js";
import { buttonTemplate } from "../button/button.template.js";
import { isInfoButtonInterface } from "../info-button/info-button.models.js";
import { infoButtonTemplate } from "../info-button/info-button.template.js";
import { isLabelInterface } from "../label/label.models.js";
import { labelTemplate } from "../label/label.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";
import { selectableTemplate } from "../selectable/selectable.template.js";
import { isSlideToggleInterface } from "../slide-toggle/slide-toggle.models.js";

import { Card, CardClickEvent } from "./card.models.js";
import { slideToggleTemplate } from "../slide-toggle/slide-toggle.template.js";

export function cardTemplate({ label, selectable, content, interactions, href, active, mode, dsoCardClick }: Card) {
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
      ${selectable ? selectableTemplate(selectable) : nothing} ${html`<h2 slot="heading" id="card-title">${label}</h2>`}
      ${
        interactions && interactions.length > 0
          ? html`<div slot="interactions">
              ${interactions.map(
                (interaction) => html`
                  <div class="dso-card-interaction">
                    ${isButtonInterface(interaction) ? buttonTemplate(interaction) : nothing}
                    ${isLabelInterface(interaction) ? labelTemplate(interaction) : nothing}
                    ${isInfoButtonInterface(interaction) ? infoButtonTemplate(interaction) : nothing}
                    ${isSlideToggleInterface(interaction) ? slideToggleTemplate(interaction) : nothing}
                  </div>
                `,
              )}
            </div>`
          : nothing
      }
      ${content && richContentTemplate({ children: content, slot: "content" })}
    </dso-card>
  `;
}
