import { ListButton } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreListButton: ComponentImplementation<ListButton> = {
  component: "listButton",
  implementation: "core",
  template: () => {
    return function listButtonTemplate({
      disabled,
      label,
      sublabel,
      subcontent,
      count,
      checked,
      min,
      max,
      dsoSelectedChange,
      dsoCountChange,
    }: ListButton) {
      return html`
        <dso-list-button
          label=${label}
          sublabel=${ifDefined(sublabel)}
          subcontent=${ifDefined(subcontent)}
          count=${ifDefined(count)}
          min=${ifDefined(min)}
          max=${ifDefined(max)}
          ?disabled=${disabled}
          ?checked=${checked}
          @dsoCountChange=${dsoCountChange}
          @dsoSelectedChange=${dsoSelectedChange}
        >
        </dso-list-button>
      `;
    };
  },
};
