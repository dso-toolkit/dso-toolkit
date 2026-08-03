import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ListButton } from "./list-button.models.js";

export function listButtonTemplate({
  disabled,
  label,
  sublabel,
  subcontent,
  subcontentPrefix,
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
      count=${ifDefined(count)}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      ?disabled=${disabled}
      ?checked=${checked}
      subcontent-prefix=${ifDefined(subcontentPrefix || undefined)}
      @dsoCountChange=${dsoCountChange}
      @dsoSelectedChange=${dsoSelectedChange}
    >
      ${subcontent ? html`<span slot="subcontent">${unsafeHTML(subcontent)}</span>` : nothing}
    </dso-list-button>
  `;
}
