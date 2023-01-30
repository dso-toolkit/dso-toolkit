import { SlideToggle } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreSlideToggle: ComponentImplementation<SlideToggle> = {
  component: "slideToggle",
  implementation: "core",
  template: () =>
    function slideToggleTemplate({ checked, disabled, identifier, arialabelledbyid, dsoActiveChange }) {
      return html`
        <dso-slide-toggle
          checked=${ifDefined(checked)}
          disabled=${ifDefined(disabled)}
          identifier=${identifier}
          arialabelledbyid=${arialabelledbyid}
          @dsoActiveChange=${dsoActiveChange}
        >
        </dso-slide-toggle>
      `;
    },
};
