import { html } from "lit-html";

import { renvooiTemplate } from "../renvooi/renvooi.template.js";

export function passendContent() {
  return html`Er is een kort label.`;
}

export function ingekortContent() {
  return html`
    Een heel lange omschrijving die niet past binnen de beschikbare ruimte en daarom wordt ingekort met een ellipsis.
  `;
}

export function ingekortMetRenvooiContent() {
  return html`
    ${renvooiTemplate({ value: { was: "vergunningplicht", wordt: "toegestaan" } })} in een heel lange omschrijving die
    niet past binnen de beschikbare ruimte.
  `;
}
