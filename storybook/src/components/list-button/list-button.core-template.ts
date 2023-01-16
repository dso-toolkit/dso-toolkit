import { ListButton } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreListButton: ComponentImplementation<ListButton> = {
  component: "listButton",
  implementation: "core",
  template: () => {
    return function listButtonTemplate({
      disabled,
      hasInputNumber,
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
          sublabel=${sublabel}
          subcontent=${subcontent}
          count=${count}
          min=${min}
          max=${max}
          ?has-input-number=${hasInputNumber}
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
