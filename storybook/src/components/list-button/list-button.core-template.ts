import { ListButton } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

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
      subcontentPrefix,
      count,
      checked,
      min,
      max,
      manual,
      dsoSelectedChange,
      dsoCountChange,
    }: ListButton) {
      return html`
        <dso-list-button
          label=${label}
          sublabel=${ifDefined(sublabel)}
          count=${ifDefined(count)}
          min=${ifDefined(min)}
          max=${ifDefined(max)}
          ?manual=${manual}
          ?disabled=${disabled}
          ?checked=${checked}
          subcontent-prefix=${subcontentPrefix}
          @dsoCountChange=${dsoCountChange}
          @dsoSelectedChange=${dsoSelectedChange}
        >
          ${subcontent ? html`<span slot="subcontent">${unsafeHTML(subcontent)}</span>` : nothing}
        </dso-list-button>
      `;
    };
  },
};
