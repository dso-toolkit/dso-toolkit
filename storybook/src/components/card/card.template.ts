import { DsoCardCustomEvent } from "@dso-toolkit/core";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { isButtonInterface } from "../button/button.models.js";
import { buttonTemplate } from "../button/button.template.js";
import { isInfoButtonInterface } from "../info-button/info-button.models.js";
import { infoButtonTemplate } from "../info-button/info-button.template.js";
import { isLabelInterface } from "../label/label.models.js";
import { labelTemplate } from "../label/label.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";
import { selectableTemplate } from "../selectable/selectable.template.js";
import { SlideToggle, isSlideToggleInterface } from "../slide-toggle/slide-toggle.models.js";

import { Card, CardClickEvent } from "./card.models.js";

export function cardTemplate({
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

function slideToggleTemplate({
  checked,
  disabled,
  accessibleLabel,
  labelledbyId,
  label,
  useOwnLabelId,
  dsoActiveChange,
}: SlideToggle) {
  return html`
    ${useOwnLabelId ? html`<div><label for=${useOwnLabelId}>Label gemaakt door de implementatie.</label></div>` : null}
    ${labelledbyId ? html`<div><span id=${labelledbyId}>Label elders op de pagina</span></div>` : null}
    <dso-slide-toggle
      identifier=${ifDefined(useOwnLabelId)}
      checked=${ifDefined(checked)}
      disabled=${ifDefined(disabled)}
      accessible-label=${ifDefined(accessibleLabel)}
      labelledby-id=${ifDefined(labelledbyId)}
      @dsoActiveChange=${dsoActiveChange}
    >
      ${label && html`<span>${label}</span>`}
    </dso-slide-toggle>
  `;
}
