import { InfoButton } from "dso-toolkit";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssInfoButton: ComponentImplementation<InfoButton> = {
  component: "infoButton",
  implementation: "html-css",
  template: () =>
    function infoButtonTemplate({ active, label, secondary, dsoToggle }) {
      return html`
        <button
          type="button"
          class="dso-info-button ${classMap({
            "dso-open": !!active,
            "dso-info-secondary": !!secondary,
          })}"
          aria-expanded=${ifDefined(active?.toString())}
          @click=${ifDefined(dsoToggle)}
        >
          <span class="sr-only"> ${label ?? "Toelichting bij optie"} </span>
        </button>
      `;
    },
};
