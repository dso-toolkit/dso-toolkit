import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { Label } from "./label.models.js";

export function labelTemplate({
  slotName,
  status,
  label,
  removable,
  dsoRemoveClick,
  compact,
  truncate,
  symbol,
}: Label & { slotName?: string }) {
  return html`
    <dso-label
      slot=${ifDefined(slotName)}
      status=${ifDefined(status)}
      @dsoRemoveClick=${ifDefined(dsoRemoveClick)}
      ?truncate=${truncate}
      ?compact=${compact}
      ?removable=${removable}
    >
      ${symbol ? html`<span slot="symbol"> ${unsafeHTML(symbol)} </span>` : nothing} ${label}
    </dso-label>
  `;
}
