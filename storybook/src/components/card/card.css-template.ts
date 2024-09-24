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
    function cardTemplate({
      label,
      selectable,
      content,
      interactions,
      image,
      imageAlt,
      imageShape = "normal",
      clickable,
      href,
      mode,
      dsoCardClicked,
    }) {
      return html`
        <div
          class="dso-card ${classMap({
            "dso-is-selectable": !!selectable,
            "dso-has-image": !!image,
            "dso-not-clickable": !clickable,
            "dso-wide-image": image !== undefined && image !== "" && imageShape === "wide",
          })}"
          @click=${ifDefined(dsoCardClicked)}
        >
          ${selectable ? html`<div class="dso-card-selectable">${selectableTemplate(selectable)}</div>` : nothing}
          ${image && imageAlt
            ? html`<div class="dso-card-image">
                <img slot="image" src=${image} alt=${imageAlt} />
              </div>`
            : nothing}
          <div class="dso-card-heading">
            ${href
              ? html`<a href=${ifDefined(href)} @click=${(e: MouseEvent) => e.preventDefault()}>
                  <h2>
                    <span id="card-title">${label}</span>
                    ${iconTemplate({
                      icon: clickable
                        ? "chevron-right"
                        : mode === "extern"
                          ? "external-link"
                          : mode === "download"
                            ? "download"
                            : "chevron-right",
                    })}
                  </h2>
                </a>`
              : html`<h2>
                  <span id="card-title">${label}</span>
                </h2>`}
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
      `;
    },
};
