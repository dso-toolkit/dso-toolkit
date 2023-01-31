import { SlideToggle } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreSlideToggle: ComponentImplementation<SlideToggle> = {
  component: "slideToggle",
  implementation: "core",
  template: () =>
    function slideToggleTemplate({ checked, disabled, accessibleLabel, labelledbyId, label, dsoActiveChange }) {
      return html`
        ${labelledbyId ? html`<div><span id=${labelledbyId}>Label elders op de pagina</span></div>` : null}
        <dso-slide-toggle
          checked=${ifDefined(checked)}
          disabled=${ifDefined(disabled)}
          accessible-label=${accessibleLabel}
          labelledby-id=${ifDefined(labelledbyId)}
          @dsoActiveChange=${dsoActiveChange}
        >
          ${label && html`<span>${label}</span>`}
        </dso-slide-toggle>
      `;
    },
};
