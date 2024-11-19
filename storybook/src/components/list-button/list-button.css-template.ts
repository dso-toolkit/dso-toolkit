import { ListButton } from "dso-toolkit";

import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const cssListButton: ComponentImplementation<ListButton> = {
  component: "listButton",
  implementation: "html-css",
  template: ({ buttonTemplate, iconTemplate }) =>
    function listButtonTemplate(listButton) {
      function listButtonComponentTemplate({
        count,
        disabled,
        hasInputNumber,
        checked,
        label,
        sublabel,
        subcontent,
      }: ListButton) {
        return html`
          <button
            type="button"
            class="dso-list-button ${classMap({ "dso-selected": (count && count > 0) || checked || false })}"
            ?disabled=${disabled}
          >
            <span>${label}</span>
            ${sublabel ? html`<span class="dso-sublabel">${sublabel}</span>` : nothing}
            ${subcontent ? html`<span class="dso-subcontent">${unsafeHTML(subcontent)}</span>` : nothing}
            ${!hasInputNumber
              ? html`
                  ${count && count === 1 ? html`${iconTemplate({ icon: "check" })}` : nothing}
                  ${count && count > 1 ? html`<span class="dso-count">${count}x</span>` : nothing}
                `
              : nothing}
            ${count && count > 0 ? html`<span class="sr-only">geselecteerd</span>` : nothing}
          </button>
        `;
      }

      return html`
        ${listButton.hasInputNumber
          ? html`
              <div class="dso-button-group">
                ${listButtonComponentTemplate(listButton)}
                <div class="dso-input-number">
                  ${buttonTemplate({
                    type: "button",
                    label: "Aantal verlagen",
                    variant: "tertiary",
                    disabled: listButton.minusButtonInactive,
                    icon: { icon: "minus-square" },
                    iconMode: "only",
                  })}
                  <input
                    type="number"
                    readonly
                    tabindex="-1"
                    min=${ifDefined(listButton.min)}
                    max=${ifDefined(listButton.max)}
                    class="dso-input-step-counter"
                    aria-label="Aantal"
                    value=${listButton.count}
                  />
                  ${buttonTemplate({
                    type: "button",
                    label: "Aantal verhogen",
                    variant: "tertiary",
                    disabled: listButton.plusButtonInactive,
                    icon: { icon: "plus-square" },
                    iconMode: "only",
                  })}
                </div>
              </div>
            `
          : html` ${listButtonComponentTemplate(listButton)} `}
      `;
    },
};
